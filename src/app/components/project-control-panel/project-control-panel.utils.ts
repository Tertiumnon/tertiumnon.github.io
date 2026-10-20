import { IProject } from "../../entities/project/project.types";

export const ProjectControlPanelUtils = {
	orderBy<T extends Record<string, unknown>>(
		list: T[],
		...args: string[]
	): T[] {
		const direction = args[0][0];
		const column = direction === "-" ? args[0].slice(1) : args[0];
		const newList = [...list];
		newList.sort((a: T, b: T) => {
			const aVal = a[column as keyof T] as unknown as
				| string
				| number
				| undefined;
			const bVal = b[column as keyof T] as unknown as
				| string
				| number
				| undefined;
			// Items without a value (a project without a release date) go last in both directions.
			if (aVal === undefined || bVal === undefined) {
				return Number(aVal === undefined) - Number(bVal === undefined);
			}
			if (aVal < bVal) {
				return direction === "-" ? -1 : 1;
			}
			if (aVal > bVal) {
				return direction === "-" ? 1 : -1;
			}
			return 0;
		});
		return newList;
	},

	filterBy(
		projectList: IProject[] | unknown[],
		param: string,
		value: string | undefined,
	): IProject[] | unknown[] | undefined {
		const newProjectList = [...(projectList as IProject[])];
		if (!value || value === "all") return projectList;
		switch (param) {
			case "status":
				return newProjectList.filter((project) => project.status === value);
			case "license":
				return newProjectList.filter((project) => project.license === value);
			default:
				return undefined;
		}
	},
};
