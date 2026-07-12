import * as fs from "node:fs/promises";
import { Post } from "../../../src/app/entities/post/post";

const ARTICLE_LIST_DIR = "src/assets/posts";
const ARTICLE_LIST_JSON = "src/assets/posts.json";

const postList: Post[] = [];

export const getPostList = async (path: string): Promise<Post[]> => {
	const posts: Post[] = [];
	const entries = await fs.readdir(path, { withFileTypes: true });
	if (!entries.length) throw new Error("No files in directory.");

	for (const entry of entries) {
		if (entry.isDirectory()) {
			const dirName = entry.name;
			const dirPath = `${path}/${dirName}`;

			// Look for index.*.md files in article directories
			const files = await fs.readdir(dirPath, { withFileTypes: true });
			for (const file of files) {
				const fileName = file.name;
				if (!file.isDirectory() && fileName.match(/^index\.(en|ru)\.md$/)) {
					const filePath = `${dirPath}/${fileName}`;
					const content = await fs.readFile(filePath, { encoding: "utf-8" });
					const fm = parseFrontmatter(content);
					const title = await getArticleTitle(filePath);
					const lang = getArticleLang(fileName);

					// Parse category from categories array or category field
					let category = fm.category ?? "";
					if (!category && fm.categories) {
						if (Array.isArray(fm.categories)) {
							category = (fm.categories as string[])[0] ?? "";
						} else if (typeof fm.categories === "string") {
							try {
								const cats = JSON.parse(fm.categories);
								category = Array.isArray(cats) ? cats[0] : "";
							} catch {
								category = "";
							}
						}
					}

					let tags: string[] = [];
					if (fm.tags) {
						if (Array.isArray(fm.tags)) {
							tags = fm.tags as string[];
						} else if (typeof fm.tags === "string") {
							try {
								tags = JSON.parse(fm.tags);
							} catch {
								tags = [];
							}
						}
					}

					const postData: Record<string, unknown> = {
						title,
						link: `/${lang}/posts/${dirName}`,
						language: lang,
						category,
						tags,
						publishedAt: fm.publishedAt ?? "",
						filename: fileName,
						dirname: dirName,
					};

					if (fm.updatedAt) {
						postData.updatedAt = fm.updatedAt;
					}

					if (fm.isHidden !== undefined) {
						postData.isHidden = fm.isHidden;
					}

					if (fm.source) {
						const [name, url] = fm.source.split(": ");
						if (name && url) {
							postData.source = {
								name: name.trim(),
								url: url.trim(),
							};
						}
					}

					posts.push(postData as unknown as Post);
				}
			}
		}
	}
	return posts;
};

export const fileIsMd = (fileName: string) => fileName.endsWith(".md");

export const getArticleLang = (fileName: string): "en" | "ru" => {
	if (fileName.endsWith(".ru.md")) return "ru";
	return "en";
};

interface Frontmatter {
	publishedAt?: string;
	updatedAt?: string;
	isHidden?: boolean;
	category?: string;
	categories?: unknown;
	tags?: unknown;
	source?: string;
}

export const parseFrontmatter = (content: string): Frontmatter => {
	if (!content.startsWith("---")) return {};
	const end = content.indexOf("\n---", 3);
	if (end === -1) return {};
	const block = content.slice(3, end).trim();
	const result: Record<string, unknown> = {};
	for (const line of block.split("\n")) {
		const colon = line.indexOf(":");
		if (colon === -1) continue;
		const key = line.slice(0, colon).trim();
		const value = line.slice(colon + 1).trim();
		if (value === "true") {
			result[key] = true;
		} else if (value === "false") {
			result[key] = false;
		} else {
			result[key] = value;
		}
	}
	return result as Frontmatter;
};

export const stripFrontmatter = (content: string): string => {
	if (!content.startsWith("---")) return content;
	const end = content.indexOf("\n---", 3);
	if (end === -1) return content;
	return content.slice(end + 4).trimStart();
};

export const getArticleTitle = async (filePath: string): Promise<string> => {
	const content = await fs.readFile(filePath, { encoding: "utf-8" });
	const body = stripFrontmatter(content);
	for (const line of body.split("\n")) {
		if (line.startsWith("# ")) return line.slice(2).trim();
	}
	return "";
};

const main = async () => {
	const posts = await getPostList(ARTICLE_LIST_DIR);
	await fs.writeFile(ARTICLE_LIST_JSON, JSON.stringify(posts, null, 2));
};

main();
