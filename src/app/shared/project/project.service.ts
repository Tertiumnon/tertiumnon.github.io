import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { HelpersComponent } from '../helpers/helpers.component';

import { IProject, State } from './project';
import PROJECTS from '../../mock-projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: IProject[] = PROJECTS;
  projects$ = new BehaviorSubject<IProject[]>(PROJECTS);
  state: State = {};
  state$ = new BehaviorSubject<State>({
    filterByStatus: 'all',
    filterByType: 'all',
    sortByAttrVal: 'year',
  });

  setState(state?: State): void {
    this.state = {
      ...this.state,
      ...state
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
    this.projects$.next(
      HelpersComponent.filterBy(this.projects, 'type', this.state.filterByType)
      );
  }

  sortProjects() {
    this.projects$.next(
      HelpersComponent.orderBy(this.projects, ...[this.state.sortByAttrVal])
      );
  }
}
