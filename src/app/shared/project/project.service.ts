import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

import PROJECTS from "../../mock-projects";
import { HelpersComponent } from "../helpers/helpers.component";
import { IProject, ProjectStatus, State } from "./project";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  projects: IProject[] = PROJECTS;
  projects$ = new BehaviorSubject<IProject[] | undefined>(PROJECTS);
  state: State = {};
  state$ = new BehaviorSubject<State>({
    filterByStatus: ProjectStatus.Active,
    filterByWorkType: "all",
    sortByAttrVal: "year",
  });

  setState(state?: State): void {
    this.state = {
      ...this.state,
      ...state,
    };
    this.filterProjects();
    this.sortProjects();
  }

  getState(): Observable<State> {
    return of(this.state);
  }

  getProjects(): Observable<IProject[]> {
    return of(this.projects);
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
