import * as fs from "node:fs/promises";
import { Article } from "../app/entities/article/article";

const ARTICLE_LIST_DIR = "src/assets/articles";
const ARTICLE_LIST_JSON = "src/assets/articles.json";

const pathList: string[] = [];
const articleList: Article[] = [];

export const createPathList = async (path: string): Promise<boolean> => {
	const entries = await fs.readdir(path, { withFileTypes: true });
	for (const entry of entries) {
		if (entry.isDirectory()) {
			const newPath = `${path}/${entry.name}`;
			// Only add category directories (those directly under ARTICLE_LIST_DIR)
			if (newPath === `${ARTICLE_LIST_DIR}/career` ||
				newPath === `${ARTICLE_LIST_DIR}/design` ||
				newPath === `${ARTICLE_LIST_DIR}/management` ||
				newPath === `${ARTICLE_LIST_DIR}/programming` ||
				newPath === `${ARTICLE_LIST_DIR}/hacks`) {
				pathList.push(newPath);
			}
		}
	}
	return true;
};

export const fileIsMd = (fileName: string) => fileName.endsWith(".md");

export const getArticleLang = (fileName: string): "en" | "ru" => {
	if (fileName.endsWith(".ru.md")) return "ru";
	return "en";
};

export const getArticleBaseName = (fileName: string): string => {
	return fileName.replace(/^\d{4}-\d{2}-\d{2}--/, "").replace(/\.(ru|en)\.md$/, "");
};

interface Frontmatter {
	publishedAt?: string;
	updatedAt?: string;
	source?: string;
}

export const parseFrontmatter = (content: string): Frontmatter => {
	if (!content.startsWith("---")) return {};
	const end = content.indexOf("\n---", 3);
	if (end === -1) return {};
	const block = content.slice(3, end).trim();
	const result: Record<string, string> = {};
	for (const line of block.split("\n")) {
		const colon = line.indexOf(":");
		if (colon === -1) continue;
		const key = line.slice(0, colon).trim();
		const value = line.slice(colon + 1).trim();
		result[key] = value;
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

export const getArticleList = async (path: string): Promise<Article[]> => {
	const articleList: Article[] = [];
	const entries = await fs.readdir(path, { withFileTypes: true });
	if (!entries.length) throw new Error("No files in directory.");

	for (const entry of entries) {
		if (entry.isDirectory()) {
			const dirName = entry.name;
			const dirPath = `${path}/${dirName}`;

			// Look for article.*.md files in subdirectories
			const files = await fs.readdir(dirPath, { withFileTypes: true });
			for (const file of files) {
				const fileName = file.name;
				if (!file.isDirectory() && fileName.match(/^index\.(en|ru)\.md$/)) {
					const filePath = `${dirPath}/${fileName}`;
					const content = await fs.readFile(filePath, { encoding: "utf-8" });
					const fm = parseFrontmatter(content);
					const title = await getArticleTitle(filePath);
					const lang = getArticleLang(fileName);
					const baseName = getArticleBaseName(dirName);
					const category = path.split("/").pop() ?? "";
					const articleData: Record<string, unknown> = {
						title,
						link: `/${lang}/articles/${category}/${baseName}`,
						language: lang,
						tags: path
							.split("/")
							.filter((p) => !["src", "assets", "articles"].includes(p)),
						publishedAt: fm.publishedAt ?? "",
						filename: fileName,
						dirname: dirName,
					};

					if (fm.updatedAt) {
						articleData.updatedAt = fm.updatedAt;
					}

					if (fm.source) {
						const [name, url] = fm.source.split(": ");
						if (name && url) {
							articleData.source = {
								name: name.trim(),
								url: url.trim(),
							};
						}
					}

					articleList.push(articleData as unknown as Article);
				}
			}
		}
	}
	return articleList;
};

export const createArticleList = async () => {
	for (const path of pathList) {
		const newArticleList = await getArticleList(path);
		articleList.push(...newArticleList);
	}
};

const main = async () => {
	await createPathList(ARTICLE_LIST_DIR);
	await createArticleList();
	await fs.writeFile(ARTICLE_LIST_JSON, JSON.stringify(articleList, null, 2));
};

main();
