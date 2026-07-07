import * as fs from "node:fs/promises";
import * as path from "node:path";

const args = process.argv.slice(2);
const postName = args[0];
const postTitle = args[1] || postName;
const lang = args[2] || "en"; // Default to English if not specified

if (!postName) {
	console.error("Usage: bun scripts/post/create/create.ts <post-name> [post-title] [lang]");
	console.error("Example: bun scripts/post/create/create.ts my-first-post \"My First Post\" en");
	console.error("Languages: en, ru (default: en)");
	process.exit(1);
}

if (!["en", "ru"].includes(lang)) {
	console.error(`Invalid language: ${lang}. Supported languages: en, ru`);
	process.exit(1);
}

const today = new Date();
const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const postDirName = `${dateStr}--${postName}`;
const postsDir = path.join(process.cwd(), "src", "assets", "posts");
const postDir = path.join(postsDir, postDirName);

const createPost = async () => {
	try {
		// Create post directory
		await fs.mkdir(postDir, { recursive: true });
		console.log(`✓ Created directory: ${postDirName}`);

		if (lang === "en" || lang === "both") {
			const enFrontmatter = `---
publishedAt: ${dateStr}
categories: [Technology]
tags: [post]
---

# ${postTitle}

Your content here...
`;

			const enPath = path.join(postDir, "index.en.md");
			await fs.writeFile(enPath, enFrontmatter);
			console.log(`✓ Created: index.en.md`);
		}

		if (lang === "ru" || lang === "both") {
			const ruFrontmatter = `---
publishedAt: ${dateStr}
categories: [Technology]
tags: [post]
---

# ${postTitle}

Ваш контент здесь...
`;

			const ruPath = path.join(postDir, "index.ru.md");
			await fs.writeFile(ruPath, ruFrontmatter);
			console.log(`✓ Created: index.ru.md`);
		}

		console.log(`\n✓ Post created successfully!`);
		console.log(`Location: src/assets/posts/${postDirName}/`);
	} catch (error) {
		console.error("Error creating post:", error);
		process.exit(1);
	}
};

createPost();
