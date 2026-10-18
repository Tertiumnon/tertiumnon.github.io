import { IProject, IProjectRelease, IProjectVersion } from "./project.types";
import { ProjectLicense, ProjectStatus } from "./project.constants";
import githubProjects from "../../../assets/projects/github-projects.json";
import projectDates from "../../../assets/project-dates.json";

const PROJECT_DATES: Record<string, string> = projectDates;

// Shape of one entry in github-projects.json; optional fields are left out of the JSON when absent.
type GithubProjectJson = {
	name: string;
	title: string;
	type?: string;
	language?: string;
	image?: string;
	screenshots?: string[];
	repoLicense?: string;
	languageIcon?: string;
	frameworks?: string[];
	description?: string;
	url: string;
	readme: boolean;
	releases: IProjectRelease[];
	version?: IProjectVersion;
};

const ACTIVE_YEARS = 5;

const activeSince = new Date();
activeSince.setFullYear(activeSince.getFullYear() - ACTIVE_YEARS);
const ACTIVE_SINCE = activeSince.toISOString().slice(0, 10);

const isActive = (updatedAt?: string): boolean =>
	updatedAt !== undefined && updatedAt >= ACTIVE_SINCE;

// Generated at build time by scripts/project/github-projects--create (only public repositories are listed).
const GITHUB_PROJECT_ITEMS: IProject[] = (githubProjects as GithubProjectJson[]).map((repo) => {
	const updatedAt = PROJECT_DATES[`github:${repo.name}`];
	return {
		name: repo.name,
		title: repo.title,
		type: repo.type,
		language: repo.language,
		description: repo.description,
		imagePreview: "",
		link: `#/projects/${repo.name}`,
		image: repo.image,
		screenshots: repo.screenshots,
		repoLicense: repo.repoLicense,
		languageIcon: repo.languageIcon,
		frameworks: repo.frameworks,
		url: repo.url,
		updatedAt,
		readme: repo.readme,
		releases: repo.releases,
		version: repo.version,
		status: isActive(updatedAt) ? ProjectStatus.Active : ProjectStatus.Inactive,
	};
});

export const TOOL_ITEMS: IProject[] = [
	{
		name: "app-port-convention",
		title: "App Port Convention",
		type: "Web Tool",
		description: "Recommended dev ports for frameworks and services.",
		imagePreview: "",
		image: "",
		link: "#/projects/app-port-convention",
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

export default GITHUB_PROJECT_ITEMS;
