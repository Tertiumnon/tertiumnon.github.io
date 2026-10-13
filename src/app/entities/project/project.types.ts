import { Params } from "@angular/router";

export interface IProject extends Params {
	name: string;
	title: string;
	type: string;
	description: string;
	image: string;
	imagePreview: string;
	link: string;
	url?: string;
	updatedAt?: string;
	status: import("./project.constants").ProjectStatus;
	license?: import("./project.constants").ProjectLicense;
}

export interface IState {
	filterByStatus?: import("./project.constants").ProjectStatus;
	filterByLicense?: string;
	sortByAttrVal?: string;
}
