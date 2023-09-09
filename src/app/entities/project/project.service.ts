import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import PROJECTS from "../../entities/project/project.mock";
import { HelpersComponent } from "../../components/helpers/helpers.component";
import { IProject, ProjectStatus, IState } from "./project.interface";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  projects: IProject[] = PROJECTS;
  projects$ = new BehaviorSubject<IProject[] | undefined>(PROJECTS);
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
    let projects = HelpersComponent.filterBy(this.projects, "status", this.state.filterByStatus);
    projects = HelpersComponent.filterBy(projects, "workType", this.state.filterByWorkType);
    this.projects$.next(projects);
  }

  sortProjects() {
    this.projects$.next(HelpersComponent.orderBy(this.projects$.value, ...[this.state.sortByAttrVal]));
  }
}
