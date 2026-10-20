import { execFileSync } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { existsSync } from "node:fs";
import { GITHUB_EXCLUDED_REPOS, GITHUB_USER } from "../../../src/app/entities/github-repo/github-repo.data";
import type { IProjectRelease, IProjectVersion } from "../../../src/app/entities/project/project.types";

const OUT_DIR = "src/assets/projects";
// Files are written here first and swapped in only after every project was fetched, so a failed run keeps the old data.
const STAGE_DIR = "src/assets/projects.next";
const JSON_FILE = path.join(STAGE_DIR, "github-projects.json");
const SITE_URL = "https://tertiumnon.github.io";

type Repo = {
	name: string;
	description: string | null;
	isFork: boolean;
	url: string;
	repositoryTopics: { name: string }[] | null;
	licenseInfo: { spdxId: string | null; name: string } | null;
	primaryLanguage: { name: string } | null;
};


type GithubProject = {
	name: string;
	title: string;
	type?: string;
	language?: string;
	languageIcon?: string;
	frameworks?: string[];
	description?: string;
	image?: string;
	screenshots?: string[];
	repoLicense?: string;
	url: string;
	readme: boolean;
	changelog?: boolean;
	licenseText?: boolean;
	releases: IProjectRelease[];
	version?: IProjectVersion;
};

const gh = (endpoint: string, ...args: string[]): string =>
	execFileSync("gh", ["api", endpoint, ...args], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });

// Project attributes that GitHub does not provide, from the project.yml file at the repository root.
type ProjectFile = { type?: string; language?: string; frameworks?: string[]; publish_on?: string[] };
const fetchProjectFile = (repo: string): ProjectFile | undefined => {
	try {
		const file = JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/contents/project.yml`)) as { content: string };
		return Bun.YAML.parse(Buffer.from(file.content, "base64").toString("utf-8")) as ProjectFile;
	} catch (error) {
		if (isNotFound(error)) return undefined;
		throw error;
	}
};

// The language icon is the file named after the language in assets/icons/languages, if there is one.
const languageIconFor = (language?: string): string | undefined => {
	if (!language) return undefined;
	const file = `${language.toLowerCase()}.svg`;
	return existsSync(path.join("src/assets/icons/languages", file)) ? `assets/icons/languages/${file}` : undefined;
};

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

// Screenshots written between these markers in a README; the site's gallery replaces them.
const SCREENSHOT_BLOCK = /<!-- screenshots -->[\s\S]*?<!-- \/screenshots -->\s*/;

// First H1 of the README, with links and emphasis removed; used as the project title.
export function readmeTitle(md: string): string | undefined {
	const heading = /^#[ \t]+(.+)$/m.exec(md)?.[1];
	return heading
		?.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[*_`]/g, "")
		.trim() || undefined;
}

const fetchRepos = (): Repo[] =>
	JSON.parse(
		execFileSync(
			"gh",
			["repo", "list", GITHUB_USER, "--limit", "1000", "--json", "name,description,isFork,url,repositoryTopics,primaryLanguage,licenseInfo"],
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

// Files of a repository folder, or none when the folder does not exist.
const listFolder = (repo: string, folder: string): { name: string; type: string }[] => {
	try {
		return JSON.parse(gh(`repos/${GITHUB_USER}/${repo}/contents/${folder}`));
	} catch (error) {
		if (isNotFound(error)) return [];
		throw error;
	}
};

const rawUrl = (repo: string, path: string): string =>
	`https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/HEAD/${path.split("/").map(encodeURIComponent).join("/")}`;

// Standard location: assets/logo/logo.svg or assets/logo/logo.png. Older repositories kept assets/logo.* at the root.
const LOGO_PATTERN = /^logo.(svg|png|webp|jpe?g)$/i;
const fetchLogo = (repo: string): string | undefined => {
	const folder = listFolder(repo, "assets/logo").find((file) => file.type === "file" && LOGO_PATTERN.test(file.name));
	if (folder) return rawUrl(repo, `assets/logo/${folder.name}`);
	const root = listFolder(repo, "assets").find((file) => file.type === "file" && LOGO_PATTERN.test(file.name));
	return root ? rawUrl(repo, `assets/${root.name}`) : undefined;
};

// Standard location: docs/screenshots/NN-name.png, in display order.
const fetchScreenshots = (repo: string): string[] =>
	listFolder(repo, "docs/screenshots")
		.filter((file) => file.type === "file" && /.(png|webp|gif|jpe?g|svg)$/i.test(file.name))
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((file) => rawUrl(repo, `docs/screenshots/${file.name}`));

// Sticker packs show one of their stickers: the first image in the stickers folder, as a raw GitHub URL.
const fetchFirstSticker = (repo: string): string | undefined => {
	const image = listFolder(repo, "stickers").find((file) => file.type === "file" && /.(png|webp|gif|jpe?g)$/i.test(file.name));
	return image ? rawUrl(repo, `stickers/${image.name}`) : undefined;
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

	// Projects are the non-fork repositories whose project.yml publish_on lists the site, except the excluded ones.
	// Type is the first GitHub topic and description is the GitHub description; a missing value stays missing.
	const repos = fetchRepos().filter((repo) => !repo.isFork && !isExcluded(repo.name));
	const projects: GithubProject[] = [];
	for (const repo of repos) {
		const attributes = fetchProjectFile(repo.name);
		if (!attributes?.publish_on?.includes(SITE_URL)) continue;
		const language = attributes?.language ?? repo.primaryLanguage?.name;
		const project: GithubProject = {
			name: repo.name,
			title: repo.name,
			type: attributes?.type,
			description: repo.description || undefined,
			language,
			frameworks: attributes?.frameworks,
			// Convention: assets/logo/logo.* is the logo; a repository without one uses the first image in stickers/ (sticker packs).
			image: fetchLogo(repo.name) ?? fetchFirstSticker(repo.name),
			screenshots: fetchScreenshots(repo.name),
			repoLicense: repo.licenseInfo?.spdxId && repo.licenseInfo.spdxId !== "NOASSERTION" ? repo.licenseInfo.spdxId : repo.licenseInfo?.name,
			url: repo.url,
			readme: false,
			releases: fetchReleases(repo.name),
			version: fetchLatestVersion(repo.name),
		};
		try {
			const md = gh(`repos/${GITHUB_USER}/${repo.name}/readme`, "-H", "Accept: application/vnd.github.raw");
			// The site shows the screenshot gallery itself, so the README's copy of the screenshots is left out.
			const body = project.screenshots?.length ? md.replace(SCREENSHOT_BLOCK, "") : md;
			await fs.writeFile(path.join(STAGE_DIR, `${repo.name}.md`), absolutizeReadmeLinks(body, repo.name));
			project.readme = true;
			project.title = readmeTitle(md) ?? project.title;
		} catch (error) {
			if (!isNotFound(error)) throw error;
		}
		// The license text, shown on the project's LICENSE page.
		for (const file of ["LICENSE", "LICENSE.md", "LICENSE.txt"]) {
			try {
				const text = gh(`repos/${GITHUB_USER}/${repo.name}/contents/${file}`, "-H", "Accept: application/vnd.github.raw");
				await fs.writeFile(path.join(STAGE_DIR, `${repo.name}.license.txt`), text);
				project.licenseText = true;
				break;
			} catch (error) {
				if (!isNotFound(error)) throw error;
			}
		}

		// CHANGELOG.md of the repository, shown on the project's CHANGELOG page.
		try {
			const changelog = gh(`repos/${GITHUB_USER}/${repo.name}/contents/CHANGELOG.md`, "-H", "Accept: application/vnd.github.raw");
			await fs.writeFile(path.join(STAGE_DIR, `${repo.name}.changelog.md`), absolutizeReadmeLinks(changelog, repo.name));
			project.changelog = true;
		} catch (error) {
			if (!isNotFound(error)) throw error;
		}
		// Icon: the language icon; a project without one but with a README (documents) shows the Markdown icon.
		project.languageIcon = languageIconFor(language) ?? (project.readme ? languageIconFor("Markdown") : undefined);
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
