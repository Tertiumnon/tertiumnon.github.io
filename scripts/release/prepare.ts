#!/usr/bin/env bun
// Runs before a release: regenerates the data and commits any change, so the release commit and the
// pre-push check (which regenerates the data again) see the same files and the push is not blocked.
import { execFileSync } from "node:child_process";

const GENERATED = [
	"src/assets/projects",
	"src/assets/project-dates.json",
	"src/assets/changelog",
	"src/assets/changelog.json",
	"src/assets/posts.json",
	"src/assets/generated.json",
];

execFileSync("bun", ["run", "generate"], { stdio: "inherit" });

const changed = execFileSync("git", ["status", "--porcelain", "--", ...GENERATED], { encoding: "utf-8" }).trim();
if (changed) {
	execFileSync("git", ["add", "--", ...GENERATED], { stdio: "inherit" });
	execFileSync("git", ["commit", "-m", "chore: regenerate project, changelog and stamp data"], { stdio: "inherit" });
	console.log("Committed the regenerated data before the release.");
} else {
	console.log("Generated data is up to date.");
}
