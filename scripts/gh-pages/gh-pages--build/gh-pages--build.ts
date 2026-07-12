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

function flattenBrowserDir(docsDir: string): void {
	const browserDir = path.join(docsDir, "browser");
	if (!fs.existsSync(browserDir)) return;
	for (const name of fs.readdirSync(browserDir)) {
		const src = path.join(browserDir, name);
		const dest = path.join(docsDir, name);
		if (fs.existsSync(dest)) {
			rmrf(dest);
		}
		fs.renameSync(src, dest);
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
	if (res.status !== 0) process.exit(res.status);

	flattenBrowserDir(docsDir);

	const nojekyllPath = path.join(docsDir, ".nojekyll");
	fs.writeFileSync(nojekyllPath, "");

	console.log("Build complete. Output location:", docsDir);
}

main();
