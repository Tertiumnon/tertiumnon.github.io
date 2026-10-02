import { ProjectControlPanelUtils } from "../components/project-control-panel/project-control-panel.utils";

export function orderBy<T extends Record<string, unknown>>(
	value: T[],
	...args: string[]
): T[] {
	return ProjectControlPanelUtils.orderBy(value, ...args);
}
