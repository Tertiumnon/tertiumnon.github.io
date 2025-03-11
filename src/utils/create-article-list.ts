import { createReadStream } from "node:fs";
import * as fs from "node:fs/promises";
import * as readline from "node:readline";
import { Article } from "../app/entities/article/article";

const ARTICLE_LIST_DIR = "src/assets/articles";
const ARTICLE_LIST_JSON = "src/assets/articles.json";

const pathList: string[] = [];
const articleList: Article[] = [];

export const createPathList = async (path: string): Promise<boolean> => {
  const files = await fs.readdir(path, { withFileTypes: true });
  if (!files.length) throw new Error("No files in directory.");
  for (const file of files) {
    if (file.isDirectory()) {
      const newPath = `${path}/${file.name}`;
      pathList.push(newPath);
      createPathList(newPath);
    }
  }
  return true;
};

export const fileIsMd = (fileName: string) => fileName.search(".md") !== -1;

export const articleIsRu = (fileName: string) => fileName.search("-ru") !== -1;

export const getArticleTitle = async (filePath: string): Promise<string> => {
  const stream = createReadStream(`${filePath}`, { encoding: "utf-8" });
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: 1000,
  });
  for await (const line of rl) {
    return line.slice(2);
  }
  return "";
};

export const getArticleList = async (path: string): Promise<Article[]> => {
  const articleList: Article[] = [];
  const files = await fs.readdir(path, { withFileTypes: true });
  if (!files.length) throw new Error("No files in directory.");
  for (const file of files) {
    const fileName = file.name;
    const filePath = `${path}/${fileName}`;
    if (!file.isDirectory() && fileIsMd(fileName)) {
      const title = await getArticleTitle(filePath);
      articleList.push({
        title,
        link: `/${filePath.split("/").slice(2).join("/")}`.replace(".md", ""),
        language: articleIsRu(fileName) ? "ru" : "en",
        tags: filePath
          .split("/")
          .slice(0, -1)
          .filter((p) => !["src", "assets", "articles"].includes(p)),
      });
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
