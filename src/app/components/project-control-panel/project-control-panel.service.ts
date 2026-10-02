import { IProject } from "../../entities/project/project.types";
import { ProjectControlPanelUtils } from "./project-control-panel.utils";

export const ProjectControlPanelService = {
	orderBy<T extends Record<string, unknown>>(
		list: T[],
		...args: string[]
	): T[] {
		return ProjectControlPanelUtils.orderBy(list, ...args);
	},

	filterBy(
		projectList: IProject[] | unknown[],
		param: string,
		value: string | undefined,
	): IProject[] | unknown[] | undefined {
		return ProjectControlPanelUtils.filterBy(projectList, param, value);
	},
};
