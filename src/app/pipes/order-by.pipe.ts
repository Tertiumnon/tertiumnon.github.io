/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from "@angular/core";
import { ProjectControlPanelService } from "../components/project-control-panel/project-control-panel.service";

@Pipe({
	name: "orderBy",
	standalone: true,
})
export class OrderByPipe implements PipeTransform {
	transform<T extends Record<string, unknown>>(
		value: T[],
		...args: string[]
	): T[] {
		return ProjectControlPanelService.orderBy(value, ...args);
	}
}
