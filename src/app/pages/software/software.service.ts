import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ProjectControlPanelService } from "../../components/project-control-panel/project-control-panel.service";
import { IProject, IState, ProjectStatus } from "../../entities/project/project.interface";
import PROJECT_ITEMS from "../../entities/project/project.mock";

@Injectable({
  providedIn: "root",
})
export class SoftwareService {
  projects: IProject[] = PROJECT_ITEMS;
  projects$ = new BehaviorSubject<IProject[] | undefined>(PROJECT_ITEMS);
  state: IState = {};
  state$ = new BehaviorSubject<IState>({
    filterByStatus: ProjectStatus.Active,
    filterByWorkType: "all",
    sortByAttrVal: "year",
  });

  setState(state?: IState): void {
    this.state = {
      ...this.state,
      ...state,
    };
    this.filterProjects();
    this.sortProjects();
  }

  filterProjects() {
    let projects = ProjectControlPanelService.filterBy(this.projects, "status", this.state.filterByStatus);
    projects = ProjectControlPanelService.filterBy(projects, "workType", this.state.filterByWorkType);
    this.projects$.next(projects);
  }

  sortProjects() {
    this.projects$.next(ProjectControlPanelService.orderBy(this.projects$.value, ...[this.state.sortByAttrVal]));
  }
}
