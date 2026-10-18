import { execFileSync } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { GITHUB_EXCLUDED_REPOS, GITHUB_USER } from "../../../src/app/entities/github-repo/github-repo.data";
import type { IProjectRelease, IProjectVersion } from "../../../src/app/entities/project/project.types";

const OUT_DIR = "src/assets/projects";
// Files are written here first and swapped in only after every project was fetched, so a failed run keeps the old data.
const STAGE_DIR = "src/assets/projects.next";
const JSON_FILE = path.join(STAGE_DIR, "github-projects.json");

type PublicRepo = {
	name: string;
	description: string | null;
	isFork: boolean;
	url: string;
	repositoryTopics: { name: string }[] | null;
	primaryLanguage: { name: string } | null;
};

const DOCS_TOPIC = "documentation";
const STICKER_TOPIC = "telegram-sticker-pack";

type GithubProject = {
	name: string;
	title: string;
	type?: string;
	language?: string;
	description?: string;
	image?: string;
	url: string;
	readme: boolean;
	releases: IProjectRelease[];
	version?: IProjectVersion;
};

const gh = (endpoint: string, ...args: string[]): string =>
	execFileSync("gh", ["api", endpoint, ...args], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });

const isNotFound = (error: unknown): boolean =>
	String((error as { stderr?: unknown }).stderr ?? error).includes("HTTP 404");

const isExcluded = (name: string): boolean =>
	GITHUB_EXCLUDED_REPOS.some((rule) => (typeof rule === "string" ? rule === name : rule.test(name)));

// Relative README links and images point at files in the repo; make them absolute so they work on the site.
export function absolutizeReadmeLinks(md: string, repo: string): string {
	const blob = `https://github.com/${GITHUB_USER}/${repo}/blob/HEAD/`;
	const raw = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/HEAD/`;
	const isRelative = (url: string): boolean => !/^(?:[a-z]+:|\/|#)/i.test(url);
	const clean = (url: string): string => url.replace(/^\.\//, "");
	return md
		.replace(/(!?\[[^\]]*\]\()([^)\s]+)/g, (match, prefix: string, url: string) =>
			isRelative(url) ? `${prefix}${prefix.startsWith("!") ? raw : blob}${clean(url)}` : match)
		.replace(/(<img[^>]*\ssrc=")([^"]+)"/g, (match, prefix: string, url: string) =>
			isRelative(url) ? `${prefix}${raw}${clean(url)}"` : match);
}

// First H1 of the README, with links and emphasis removed; used as the project title.
export function readmeTitle(md: string): string | undefined {
	const heading = /^#[ \t]+(.+)$/m.exec(md)?.[1];
	return heading
		?.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[*_`]/g, "")
		.trim() || undefined;
}

const fetchPublicRepos = (): PublicRepo[] =>
	JSON.parse(
		execFileSync(
			"gh",
			["repo", "list", GITHUB_USER, "--visibility", "public", "--limit", "1000", "--json", "name,description,isFork,url,repositoryTopics,primaryLanguage"],
			{ encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 },
		),
	);

// Latest release-style tag (vX.Y.Z, pre-releases skipped) and the date of its commit.
const fetchLatestVersion = (repo: string): IProjectVersion | undefined => {
	const tags = JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/tags?per_page=100`)) as {
		name: string;
		commit: { sha: string };
	}[];
	const parsed = tags
		.map((tag) => ({ tag, match: /^v?(\d+)\.(\d+)\.(\d+)$/.exec(tag.name) }))
		.filter((item): item is { tag: (typeof tags)[number]; match: RegExpExecArray } => item.match !== null)
		.map(({ tag, match }) => ({ tag, parts: match.slice(1).map(Number) }));
	if (parsed.length === 0) return undefined;
	const latest = parsed.reduce((best, item) => {
		const diff = [0, 1, 2].map((i) => item.parts[i] - best.parts[i]).find((d) => d !== 0) ?? 0;
		return diff > 0 ? item : best;
	});
	const commit = JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/commits/${latest.tag.commit.sha}`)) as {
		commit: { committer: { date: string } };
	};
	return { tag: latest.tag.name, date: commit.commit.committer.date.slice(0, 10) };
};

// Sticker packs show one of their stickers: the first image in the stickers folder, as a raw GitHub URL.
const fetchFirstSticker = (repo: string): string | undefined => {
	const files = JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/contents/stickers`)) as { name: string; type: string }[];
	const image = files.find((file) => file.type === "file" && /\.(png|webp|gif|jpe?g)$/i.test(file.name));
	if (!image) return undefined;
	const encodedPath = image.name.split("/").map(encodeURIComponent).join("/");
	return `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/HEAD/stickers/${encodedPath}`;
};

const fetchReleases = (repo: string): IProjectRelease[] =>
	(JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/releases`)) as {
		name: string | null;
		tag_name: string;
		html_url: string;
		published_at: string;
		assets: { name: string; browser_download_url: string }[];
	}[]).map((release) => ({
		name: release.name || release.tag_name,
		tag: release.tag_name,
		url: release.html_url,
		publishedAt: release.published_at?.slice(0, 10) ?? "",
		assets: release.assets.map((asset) => ({ name: asset.name, url: asset.browser_download_url })),
	}));

const main = async (): Promise<void> => {
	await fs.rm(STAGE_DIR, { recursive: true, force: true });
	await fs.mkdir(STAGE_DIR, { recursive: true });

	// Projects are every public, non-fork repository except the excluded ones.
	// Type is the first GitHub topic and description is the GitHub description; a missing value stays missing.
	const repos = fetchPublicRepos().filter((repo) => !repo.isFork && !isExcluded(repo.name));
	const projects: GithubProject[] = [];
	for (const repo of repos) {
		const topics = (repo.repositoryTopics ?? []).map((topic) => topic.name);
		// "documentation" marks docs-only repos: they get the Markdown icon, and it is not used as the type label.
		const isDocs = topics.includes(DOCS_TOPIC);
		const project: GithubProject = {
			name: repo.name,
			title: repo.name,
			type: topics.filter((topic) => topic !== DOCS_TOPIC)[0]?.replace(/-/g, " "),
			description: repo.description || undefined,
			language: isDocs ? "Markdown" : repo.primaryLanguage?.name,
			image: topics.includes(STICKER_TOPIC) ? fetchFirstSticker(repo.name) : undefined,
			url: repo.url,
			readme: false,
			releases: fetchReleases(repo.name),
			version: fetchLatestVersion(repo.name),
		};
		try {
			const md = gh(`repos/${GITHUB_USER}/${repo.name}/readme`, "-H", "Accept: application/vnd.github.raw");
			await fs.writeFile(path.join(STAGE_DIR, `${repo.name}.md`), absolutizeReadmeLinks(md, repo.name));
			project.readme = true;
			project.title = readmeTitle(md) ?? project.title;
		} catch (error) {
			if (!isNotFound(error)) throw error;
		}
		projects.push(project);
	}

	await fs.writeFile(JSON_FILE, `${JSON.stringify(projects, null, 2)}\n`);
	await fs.rm(OUT_DIR, { recursive: true, force: true });
	await fs.rename(STAGE_DIR, OUT_DIR);
	console.log(`GitHub projects: ${projects.length} public repositories kept.`);
};

if (import.meta.main) {
	main().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}
