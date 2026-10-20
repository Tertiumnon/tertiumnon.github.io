import * as fs from "node:fs/promises";

const MANUAL_FILE = "scripts/project/dates--create/manual-dates.json";
const GITHUB_PROJECTS_FILE = "src/assets/projects/github-projects.json";
const DATES_JSON = "src/assets/project-dates.json";

// A project's date is its latest release (version tag), which github-projects--create records; manual dates override it.
// A project without a release has no date, so the list shows none and sorts it after the dated projects.
const main = async (): Promise<void> => {
	const projects = JSON.parse(await fs.readFile(GITHUB_PROJECTS_FILE, { encoding: "utf-8" })) as {
		name: string;
		version?: { date: string };
	}[];
	const manual = JSON.parse(await fs.readFile(MANUAL_FILE, { encoding: "utf-8" })) as Record<string, string>;
	const released = projects.flatMap((project) => (project.version ? [[`github:${project.name}`, project.version.date]] : []));
	const dates = Object.fromEntries([...released, ...Object.entries(manual)].sort(([a], [b]) => a.localeCompare(b)));
	await fs.writeFile(DATES_JSON, `${JSON.stringify(dates, null, 2)}\n`);
	console.log(`Project dates: ${Object.keys(dates).length} from releases and manual dates.`);
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
