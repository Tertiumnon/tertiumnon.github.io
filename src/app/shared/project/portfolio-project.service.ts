import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { PORTFOLIO_PROJECTS } from "../../mock-portfolios";
import { HelpersComponent } from "../helpers/helpers.component";
import { IProject, State } from "./project";

@Injectable({
  providedIn: "root",
})
export class PortfolioProjectService {
  projects: IProject[] = PORTFOLIO_PROJECTS;
  projects$ = new BehaviorSubject<IProject[] | undefined>(PORTFOLIO_PROJECTS);
  state: State = {};
  state$ = new BehaviorSubject<State>({
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

  filterProjects() {
    let projects = HelpersComponent.filterBy(this.projects, "workType", this.state.filterByWorkType);
    this.projects$.next(projects);
  }

  sortProjects() {
    this.projects$.next(HelpersComponent.orderBy(this.projects$.value, ...[this.state.sortByAttrVal]));
  }
}
