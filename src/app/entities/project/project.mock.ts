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
	changelog?: boolean;
	licenseText?: boolean;
	releases: IProjectRelease[];
	version?: IProjectVersion;
};

const ACTIVE_YEARS = 5;

const activeSince = new Date();
activeSince.setFullYear(activeSince.getFullYear() - ACTIVE_YEARS);
const ACTIVE_SINCE = activeSince.toISOString().slice(0, 10);

const isActive = (updatedAt?: string): boolean =>
	updatedAt !== undefined && updatedAt >= ACTIVE_SINCE;

// Licence category of a repository: MIT is open source; other licences (personal-use or CC BY content) are free.
const licenseOf = (repoLicense?: string): ProjectLicense | undefined =>
	repoLicense === undefined ? undefined : repoLicense === "MIT License" ? ProjectLicense.OpenSource : ProjectLicense.Free;

// Generated at build time by scripts/project/github-projects--create (renamed or removed repos are already dropped).
// Status and licence are derived here, from the update date and the repository licence, because the JSON does not carry them.
const GITHUB_PROJECT_ITEMS: IProject[] = (githubProjects as GithubProjectJson[]).map((repo) => {
	const updatedAt = PROJECT_DATES[`github:${repo.name}`];
	return {
		name: repo.name,
		title: repo.title,
		type: repo.type,
		description: repo.description,
		imagePreview: "",
		image: "",
		link: `#/projects/${repo.name}`,
		url: repo.url,
		updatedAt,
		readme: repo.readme,
		releases: repo.releases,
		license: licenseOf(repo.repoLicense),
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
