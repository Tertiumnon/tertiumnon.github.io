import { IProject } from "./project.types";
import { ProjectLicense, ProjectStatus } from "./project.constants";
import { GITHUB_REPOS, GITHUB_USER } from "../github-repo/github-repo.data";
import projectDates from "../../../assets/project-dates.json";

const PROJECT_DATES: Record<string, string> = projectDates;

const GITHUB_PROJECT_ITEMS: IProject[] = GITHUB_REPOS.map((repo) => ({
	name: repo.name,
	title: repo.title,
	type: repo.type,
	description: repo.description,
	imagePreview: "",
	image: "",
	link: `#/software/github/${repo.name}`,
	updatedAt: PROJECT_DATES[`github:${repo.name}`],
	status: repo.status,
}));

export const TOOL_ITEMS: IProject[] = [
	{
		name: "app-port-convention",
		title: "App Port Convention",
		type: "Web Tool",
		description: "Recommended dev ports for frameworks and services.",
		imagePreview: "",
		image: "",
		link: "#/software/app-port-convention",
		updatedAt: PROJECT_DATES["github:app-port-convention"],
		license: ProjectLicense.OpenSource,
		status: ProjectStatus.Active,
	},
	{
		name: "what-time",
		title: "What Time",
		type: "Web Tool",
		description: "Web tool for showing time.",
		imagePreview: "",
		image: "",
		link: "#/tools/what-time",
		status: ProjectStatus.Active,
	},
];

const MANUAL_PROJECT_ITEMS: IProject[] = [
	{
		name: "git-style-guide",
		title: "Git Style Guide",
		type: "Style Guide",
		description: "Git Style Guide.",
		imagePreview: "",
		image: "",
		link: "#/software/git-style-guide",
		url: "https://github.com/Tertiumnon/git-style-guide",
		status: ProjectStatus.Inactive,
	},
	{
		name: "rest-api-style-guide",
		title: "REST API Style Guide",
		type: "Style Guide",
		description: "REST API Style Guide.",
		imagePreview: "",
		image: "",
		link: "#/software/rest-api-style-guide",
		url: "https://github.com/Tertiumnon/rest-api-style-guide",
		status: ProjectStatus.Inactive,
	},
	{
		name: "frontend-style-guide",
		title: "Frontend Style Guide",
		type: "Style Guide",
		description: "Frontend Style Guide.",
		imagePreview: "",
		image: "",
		link: "#/software/frontend-style-guide",
		url: "https://github.com/Tertiumnon/frontend-style-guide",
		status: ProjectStatus.Inactive,
	},
	{
		name: "send-text-to-form",
		title: "Send Text To Form",
		type: "Chrome Extension",
		description: "Chrome extension for sending text to form on any page.",
		imagePreview: "",
		image:
			"/assets/images/projects/send-text-to-form-web-ext/2017-send-text-to-form-web-ext.png",
		link: "#/software/send-text-to-form",
		url: "https://chrome.google.com/webstore/detail/send-text-to-form/oapmpchdbmlmblgeambfmcmmoalbgooi",
		updatedAt: PROJECT_DATES["github:send-text-to-form"],
		status: ProjectStatus.Inactive,
	},
	{
		name: "bookmarks-manager",
		title: "Bookmarks Manager",
		type: "Firefox Extension",
		description: "Firefox extension for bookmarks organizing.",
		imagePreview: "",
		image: "",
		link: "#/software/bookmarks-manager",
		url: "https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/",
		updatedAt: PROJECT_DATES["github:bookmarks-manager"],
		status: ProjectStatus.Active,
	},
	{
		name: "json-all-to-one",
		title: "JSON All to One",
		type: "NodeJS Package",
		description: "NodeJS script for JSON files concatenation.",
		imagePreview: "",
		image: "",
		link: "#/software/json-all-to-one",
		url: "https://www.npmjs.com/package/json-all-to-one",
		license: ProjectLicense.OpenSource,
		status: ProjectStatus.Inactive,
	},
	{
		name: "json-to-sql",
		title: "JSON to SQL",
		type: "NodeJS Package",
		description: "NodeJS script that creates SQL script from JSON file.",
		imagePreview: "",
		image: "",
		link: "#/software/json-to-sql",
		url: "https://www.npmjs.com/package/json-to-sql-script",
		license: ProjectLicense.OpenSource,
		status: ProjectStatus.Inactive,
	},
	{
		name: "tertium-countries",
		title: "@tertium/countries",
		type: "NodeJS Package",
		description: "NodeJS module for country codes.",
		imagePreview: "",
		image: "",
		link: "#/software/tertium-countries",
		url: "https://www.npmjs.com/package/@tertium/countries",
		license: ProjectLicense.OpenSource,
		status: ProjectStatus.Inactive,
	},
	{
		name: "tertium-icons",
		title: "Tertium Icons",
		type: "NodeJS Package",
		description: "SVG and font icons.",
		imagePreview: "",
		image: "",
		link: "#/software/tertium-icons",
		url: "https://www.npmjs.com/package/tertium.icons",
		license: ProjectLicense.OpenSource,
		status: ProjectStatus.Inactive,
	},
	{
		name: "senior-pomodoro",
		title: "Senior Pomodoro",
		type: "Desktop Application",
		description: "Pomodoro timer for coders.",
		imagePreview: "",
		image: "",
		link: "#/software/senior-pomodoro",
		updatedAt: PROJECT_DATES["github:senior-pomodoro-app"],
		license: ProjectLicense.Free,
		status: ProjectStatus.Inactive,
	},
];

const ACTIVE_YEARS = 5;

const activeSince = new Date();
activeSince.setFullYear(activeSince.getFullYear() - ACTIVE_YEARS);
const ACTIVE_SINCE = activeSince.toISOString().slice(0, 10);

const isActive = (updatedAt?: string): boolean =>
	updatedAt !== undefined && updatedAt >= ACTIVE_SINCE;

const PROJECT_ITEMS: IProject[] = [...MANUAL_PROJECT_ITEMS, ...GITHUB_PROJECT_ITEMS].map(
	(project) => ({
		...project,
		status: isActive(project.updatedAt) ? ProjectStatus.Active : ProjectStatus.Inactive,
	}),
);

export default PROJECT_ITEMS;
