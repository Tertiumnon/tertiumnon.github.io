import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ProjectControlPanelService } from "../../components/project-control-panel/project-control-panel.service";
import { ProjectStatus } from "../../entities/project/project.constants";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { IProject, IState } from "../../entities/project/project.types";

@Injectable({
	providedIn: "root",
})
export class ProjectsService {
	projects: IProject[] = PROJECT_ITEMS;
	projects$ = new BehaviorSubject<IProject[] | undefined>(PROJECT_ITEMS);
	state: IState = {
		filterByStatus: ProjectStatus.Active,
		filterByLicense: "all",
		sortByAttrVal: "updatedAt",
	};

	// The list is filtered and sorted from the start, so it does not depend on the filter panel being rendered.
	constructor() {
		this.setState();
	}

	setState(state?: IState): void {
		this.state = {
			...this.state,
			...state,
		};
		this.filterProjects();
		this.sortProjects();
	}

	filterProjects() {
		let projects = ProjectControlPanelService.filterBy(
			this.projects,
			"status",
			this.state.filterByStatus,
		);
		projects = ProjectControlPanelService.filterBy(
			projects ?? [],
			"license",
			this.state.filterByLicense,
		);
		this.projects$.next(projects as IProject[]);
	}

	sortProjects() {
		const sortBy = this.state.sortByAttrVal ?? "updatedAt";
		this.projects$.next(
			ProjectControlPanelService.orderBy(this.projects$.value ?? [], sortBy),
		);
	}
}
