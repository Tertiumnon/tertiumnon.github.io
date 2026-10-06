import { Params } from "@angular/router";

export interface IProject extends Params {
	name: string;
	title: string;
	type: string;
	description: string;
	image: string;
	imagePreview: string;
	link: string;
	year: number;
	status: import("./project.constants").ProjectStatus;
}

export interface IState {
	filterByStatus?: import("./project.constants").ProjectStatus;
	filterByWorkType?: string;
	sortByAttrVal?: string;
}
