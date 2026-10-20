import { execFileSync } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { GITHUB_USER } from "../../../src/app/entities/github-repo/github-repo.data";

const CHANGELOG_JSON = "src/assets/changelog.json";
const CHANGELOG_DIR = "src/assets/changelog";
const PROJECTS_JSON = "src/assets/projects/github-projects.json";

type ChangelogItem = {
	title: string;
	link: string;
	language: "en";
	category: string;
	project?: string;
	tags: string[];
	publishedAt: string;
	filename: string;
	dirname: string;
	content?: string;
	generated?: boolean;
	source?: { name: string; url: string };
};

type GithubProject = { name: string; title: string; url?: string; changelog?: boolean };
type ChangelogSection = { version: string; body: string };
type TagInfo = { name: string; date: string };

const gh = (endpoint: string, ...args: string[]): string =>
	execFileSync("gh", ["api", endpoint, ...args], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });


// "## 0.2.2" and "## [1.0.0] - 2020-01-01" are releases; "## [Unreleased]" and other headings are not.
const RELEASE_HEADING = /^## \[?v?(\d+\.\d+\.\d+)\]?/;

export function parseChangelog(md: string): ChangelogSection[] {
	const sections: { version: string; lines: string[] }[] = [];
	let current: { version: string; lines: string[] } | undefined;
	for (const line of md.split(/\r?\n/)) {
		if (line.startsWith("## ")) {
			const match = RELEASE_HEADING.exec(line);
			current = match ? { version: match[1], lines: [] } : undefined;
			if (current) sections.push(current);
			continue;
		}
		current?.lines.push(line);
	}
	return sections
		.map((section) => ({ version: section.version, body: section.lines.join("\n").trim() }))
		.filter((section) => section.body.length > 0);
}

// Tags of a repository by version: both "v1.2.3" and "1.2.3" name styles, dated by their commit.
const fetchTags = (repo: string, versions: string[]): Map<string, TagInfo> => {
	const tags = JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/tags?per_page=100`)) as {
		name: string;
		commit: { sha: string };
	}[];
	const byVersion = new Map<string, TagInfo>();
	for (const version of versions) {
		const tag = tags.find((item) => item.name === `v${version}` || item.name === version);
		if (!tag) continue;
		const commit = JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/commits/${tag.commit.sha}`)) as {
			commit: { committer: { date: string } };
		};
		byVersion.set(version, { name: tag.name, date: commit.commit.committer.date.slice(0, 10) });
	}
	return byVersion;
};

const main = async (): Promise<void> => {
	const projects = JSON.parse(await fs.readFile(PROJECTS_JSON, { encoding: "utf-8" })) as GithubProject[];
	const existing = JSON.parse(await fs.readFile(CHANGELOG_JSON, { encoding: "utf-8" })) as ChangelogItem[];

	// Generated items are rebuilt on every run; hand-written items are kept as they are.
	const manual = await Promise.all(
		existing
			.filter((item) => !item.generated)
			.map(async (item) => ({
				...item,
				content: await fs.readFile(path.join(CHANGELOG_DIR, item.dirname, item.filename), { encoding: "utf-8" }),
			})),
	);
	for (const item of existing.filter((entry) => entry.generated)) {
		await fs.rm(path.join(CHANGELOG_DIR, item.dirname), { recursive: true, force: true });
	}

	const generated: ChangelogItem[] = [];
	// The project generator records which repositories have a CHANGELOG.md, so no request ends in a 404.
	for (const project of projects.filter((item) => item.changelog)) {
		const markdown = gh(`repos/${GITHUB_USER}/${project.name}/contents/CHANGELOG.md`, "-H", "Accept: application/vnd.github.raw");

		const sections = parseChangelog(markdown);
		const tags = fetchTags(project.name, sections.map((section) => section.version));
		for (const section of sections) {
			const tag = tags.get(section.version);
			if (!tag) {
				console.warn(`Skipped changelog: ${project.name} ${section.version} has no matching tag`);
				continue;
			}
			const title = `${project.title} ${section.version}`;
			const dirname = `${tag.date}--${project.name}-${section.version.replace(/\./g, "-")}`;
			await fs.mkdir(path.join(CHANGELOG_DIR, dirname), { recursive: true });
			// The changelog page strips the first "#" heading, so the title is written as "##".
			const markdown = `## ${title}

${section.body}
`;
			await fs.writeFile(path.join(CHANGELOG_DIR, dirname, "index.en.md"), markdown);
			generated.push({
				title,
				link: `/en/changelog/${dirname}`,
				language: "en",
				category: "Releases",
				project: project.title,
				tags: [project.name],
				publishedAt: tag.date,
				filename: "index.en.md",
				dirname,
				generated: true,
				content: markdown,
				// A private repository has no public URL, so its entries carry no link to it.
				source: project.url ? { name: "GitHub", url: `${project.url}/releases/tag/${tag.name}` } : undefined,
			});
		}
	}

	await fs.writeFile(CHANGELOG_JSON, `${JSON.stringify([...manual, ...generated], null, 2)}\n`);
	console.log(`Changelog: ${manual.length} written by hand, ${generated.length} from changelogs.`);
};

if (import.meta.main) {
	main().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}
