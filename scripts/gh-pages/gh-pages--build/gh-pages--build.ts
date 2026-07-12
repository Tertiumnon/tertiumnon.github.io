import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

function rmrf(p: string): void {
	try {
		fs.rmSync(p, { recursive: true, force: true });
	} catch {
		// ignore
	}
}

function copyDirRecursive(src: string, dest: string): void {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}
	for (const file of fs.readdirSync(src)) {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);
		if (fs.statSync(srcPath).isDirectory()) {
			copyDirRecursive(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

function flattenBrowserDir(docsDir: string): void {
	const browserDir = path.join(docsDir, "browser");
	if (!fs.existsSync(browserDir)) return;
	for (const name of fs.readdirSync(browserDir)) {
		const src = path.join(browserDir, name);
		const dest = path.join(docsDir, name);
		if (fs.existsSync(dest)) {
			rmrf(dest);
		}
		// Copy instead of rename (safer on Windows)
		if (fs.statSync(src).isDirectory()) {
			copyDirRecursive(src, dest);
		} else {
			fs.copyFileSync(src, dest);
		}
	}
	rmrf(browserDir);
}

function main(): void {
	const repoRoot = process.cwd();
	const docsDir = path.join(repoRoot, "docs");

	rmrf(docsDir);

	console.log("Running: ng build --output-path docs --base-href /");
	const res = spawnSync("ng", ["build", "--output-path", "docs", "--base-href", "/"], {
		stdio: "inherit",
	});
	if (res.error) {
		console.error("Failed to run ng build:", res.error);
		process.exit(1);
	}
	const exitCode = res.status ?? 1;
	if (exitCode !== 0) process.exit(exitCode);

	flattenBrowserDir(docsDir);

	const nojekyllPath = path.join(docsDir, ".nojekyll");
	try {
		fs.writeFileSync(nojekyllPath, "");
		console.log("Created .nojekyll file at:", nojekyllPath);
		if (!fs.existsSync(nojekyllPath)) {
			throw new Error(".nojekyll file was not created successfully");
		}
	} catch (e) {
		console.error("Failed to create .nojekyll file:", e);
		process.exit(1);
	}

	console.log("Build complete. Output location:", docsDir);
}

main();
