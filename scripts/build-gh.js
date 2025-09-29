#!/usr/bin/env node
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function rmrf(p) {
	try {
		fs.rmSync(p, { recursive: true, force: true });
	} catch (e) {
		// ignore
	}
}

function flattenBrowserDir(docsDir) {
	const browserDir = path.join(docsDir, "browser");
	if (!fs.existsSync(browserDir)) return;
	for (const name of fs.readdirSync(browserDir)) {
		const src = path.join(browserDir, name);
		const dest = path.join(docsDir, name);
		// if dest exists, remove it first
		if (fs.existsSync(dest)) {
			rmrf(dest);
		}
		fs.renameSync(src, dest);
	}
	// remove the now-empty browser dir
	rmrf(browserDir);
}

function main() {
	const repoRoot = process.cwd();
	const docsDir = path.join(repoRoot, "docs");

	// Clean docs
	rmrf(docsDir);

	// Run ng build
	console.log("Running: ng build --output-path docs --base-href /");
	const res = spawnSync(
		"ng",
		["build", "--output-path", "docs", "--base-href", "/"],
		{ stdio: "inherit" },
	);
	if (res.error) {
		console.error("Failed to run ng build:", res.error);
		process.exit(1);
	}
	if (res.status !== 0) process.exit(res.status);

	// If Angular emitted a nested browser folder, flatten it.
	flattenBrowserDir(docsDir);

	console.log("Build complete. Output location:", docsDir);
}

main();
