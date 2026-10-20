import type { Params } from "@angular/router";

export interface IProjectReleaseAsset {
	name: string;
	url: string;
}

export interface IProjectRelease {
	name: string;
	tag: string;
	url: string;
	publishedAt: string;
	assets: IProjectReleaseAsset[];
}

export interface IProjectVersion {
	tag: string;
	date: string;
}

export interface IProject extends Params {
	name: string;
	title: string;
	type?: string;
	language?: string;
	description?: string;
	image?: string;
	screenshots?: string[];
	repoLicense?: string;
	languageIcon?: string;
	frameworks?: string[];
	imagePreview: string;
	link: string;
	url?: string;
	updatedAt?: string;
	status: import("./project.constants").ProjectStatus;
	license?: import("./project.constants").ProjectLicense;
	readme?: boolean;
	changelog?: boolean;
	licenseText?: boolean;
	releases?: IProjectRelease[];
	version?: IProjectVersion;
}

export interface IState {
	filterByStatus?: import("./project.constants").ProjectStatus;
	filterByLicense?: string;
	sortByAttrVal?: string;
}
