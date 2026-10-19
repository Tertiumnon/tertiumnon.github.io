#!/usr/bin/env bun
// Keeps a timestamp of the last change to the generated data, so the remote refresh can tell when it is stale.
//   bun ./scripts/generate/stamp.ts          record a new stamp if the generated data differs from git
//   bun ./scripts/generate/stamp.ts --stale  print "stale" when the stamp is older than the given days (default 14)
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const STAMP = "src/assets/generated.json";
const GENERATED = [
	"src/assets/projects",
	"src/assets/project-dates.json",
	"src/assets/changelog",
	"src/assets/changelog.json",
	"src/assets/posts.json",
	"src/assets/lines.json",
];
const DAY_MS = 24 * 60 * 60 * 1000;

async function readStamp(): Promise<{ generatedAt: string } | undefined> {
	try {
		return JSON.parse(await readFile(STAMP, "utf-8"));
	} catch {
		return undefined;
	}
}

const [mode, days = "14"] = process.argv.slice(2);

if (mode === "--stale") {
	const stamp = await readStamp();
	const age = stamp ? Date.now() - new Date(stamp.generatedAt).getTime() : Number.POSITIVE_INFINITY;
	console.log(age > Number(days) * DAY_MS ? "stale" : "fresh");
	process.exit(0);
}

// Only a change to the generated files (compared with the last commit) moves the stamp.
const changed = execFileSync("git", ["status", "--porcelain", "--", ...GENERATED], { encoding: "utf-8" }).trim() !== "";
if (changed) {
	await writeFile(STAMP, `${JSON.stringify({ generatedAt: new Date().toISOString() }, null, 2)}\n`);
	console.log("Generated data changed: stamp updated.");
} else {
	console.log("Generated data unchanged.");
}
