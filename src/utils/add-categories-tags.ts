import * as fs from "node:fs/promises";
import * as path from "node:path";

const POSTS_DIR = "src/assets/posts";

interface CategoryMapping {
	keywords: string[];
	categories: string[];
	tags: string[];
}

const categoryMappings: CategoryMapping[] = [
	{
		keywords: ["javascript", "js:", "decode", "validate", "redux", "typescript", "ts"],
		categories: ["Programming"],
		tags: ["JavaScript", "Web Development"],
	},
	{
		keywords: ["react", "angular", "vue", "frontend"],
		categories: ["Programming"],
		tags: ["Frontend", "Web Development"],
	},
	{
		keywords: ["php", "expressjs", "node", "backend"],
		categories: ["Programming"],
		tags: ["Backend", "Server"],
	},
	{
		keywords: ["bun", "runtime", "tooling"],
		categories: ["Programming"],
		tags: ["JavaScript", "Tools"],
	},
	{
		keywords: ["firefox", "chrome", "browser", "extension"],
		categories: ["Browsers"],
		tags: ["Browser", "Extensions"],
	},
	{
		keywords: ["windows", "powershell", "shell", "cmd", "bash"],
		categories: ["System Administration"],
		tags: ["Windows", "Terminal"],
	},
	{
		keywords: ["ssh", "git", "github", "azure", "version control"],
		categories: ["Development Tools"],
		tags: ["Git", "DevOps"],
	},
	{
		keywords: ["vscode", "ide", "editor", "xdebug"],
		categories: ["Development Tools"],
		tags: ["IDE", "Development"],
	},
	{
		keywords: ["career", "programmer", "developer", "job"],
		categories: ["Career"],
		tags: ["Career", "Professional Growth"],
	},
	{
		keywords: ["design", "ui", "ux"],
		categories: ["Design"],
		tags: ["Design", "UX"],
	},
	{
		keywords: ["agile", "kanban", "scrum", "management"],
		categories: ["Management"],
		tags: ["Agile", "Project Management"],
	},
	{
		keywords: ["book", "learning", "education"],
		categories: ["Learning"],
		tags: ["Books", "Education"],
	},
	{
		keywords: ["ai", "artificial intelligence"],
		categories: ["Technology"],
		tags: ["AI", "Technology"],
	},
];

async function getArticleTitle(filePath: string): Promise<string> {
	const content = await fs.readFile(filePath, { encoding: "utf-8" });
	const lines = content.split("\n");
	for (const line of lines) {
		if (line.startsWith("# ")) {
			return line.slice(2).trim().toLowerCase();
		}
	}
	return "";
}

function suggestCategoriesAndTags(title: string): { categories: string[]; tags: string[] } {
	const categories = new Set<string>();
	const tags = new Set<string>();

	for (const mapping of categoryMappings) {
		for (const keyword of mapping.keywords) {
			if (title.includes(keyword)) {
				mapping.categories.forEach((c) => categories.add(c));
				mapping.tags.forEach((t) => tags.add(t));
			}
		}
	}

	// Default categories if none found
	if (categories.size === 0) {
		categories.add("Hacks");
		tags.add("Tips");
	}

	return {
		categories: Array.from(categories).sort(),
		tags: Array.from(tags).sort(),
	};
}

async function updateArticleFile(
	filePath: string,
	categories: string[],
	tags: string[]
): Promise<void> {
	const content = await fs.readFile(filePath, { encoding: "utf-8" });

	// Find the frontmatter
	if (!content.startsWith("---")) {
		console.warn(`File ${filePath} does not start with frontmatter`);
		return;
	}

	const endIndex = content.indexOf("\n---", 3);
	if (endIndex === -1) {
		console.warn(`File ${filePath} does not have closing frontmatter`);
		return;
	}

	const frontmatter = content.slice(3, endIndex).trim();
	const body = content.slice(endIndex + 4);

	// Parse existing frontmatter
	const lines = frontmatter.split("\n");
	const existingFields: Record<string, string> = {};

	for (const line of lines) {
		const colonIndex = line.indexOf(":");
		if (colonIndex !== -1) {
			const key = line.slice(0, colonIndex).trim();
			const value = line.slice(colonIndex + 1).trim();
			existingFields[key] = value;
		}
	}

	// Add/update categories and tags
	existingFields.categories = JSON.stringify(categories);
	existingFields.tags = JSON.stringify(tags);

	// Rebuild frontmatter with proper order
	const orderedFields = ["publishedAt", "updatedAt", "isHidden", "categories", "tags", "source"];
	const newFrontmatterLines: string[] = [];

	for (const field of orderedFields) {
		if (existingFields[field]) {
			newFrontmatterLines.push(`${field}: ${existingFields[field]}`);
		}
	}

	// Add any other fields not in the ordered list
	for (const [key, value] of Object.entries(existingFields)) {
		if (!orderedFields.includes(key)) {
			newFrontmatterLines.push(`${key}: ${value}`);
		}
	}

	const newContent = `---\n${newFrontmatterLines.join("\n")}\n---${body}`;
	await fs.writeFile(filePath, newContent, { encoding: "utf-8" });
}

async function main() {
	const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;

		const dirPath = path.join(POSTS_DIR, entry.name);
		const files = await fs.readdir(dirPath, { withFileTypes: true });

		for (const file of files) {
			if (file.name.match(/^index\.(en|ru)\.md$/)) {
				const filePath = path.join(dirPath, file.name);
				const title = await getArticleTitle(filePath);
				const { categories, tags } = suggestCategoriesAndTags(title);

				await updateArticleFile(filePath, categories, tags);
				console.log(
					`Updated ${entry.name}/${file.name}: ${categories.join(", ")} | ${tags.join(", ")}`
				);
			}
		}
	}

	console.log("Done!");
}

main().catch(console.error);
