import { Injectable } from '@angular/core';
import PROJECT_ITEMS from './project.mock';
import { IProject } from './project.interface';
import { FilterOperator, IApiRequestFindParams } from '../../core/api/api-request-find.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  find(params: IApiRequestFindParams): IProject[] {
    const { filters } = params;
    let projects = [...PROJECT_ITEMS];
    if (filters.length) {
      filters.forEach((filter) => {
        projects = projects.filter((project) => project[filter.name] === filter.value)
      })
    }
    return projects;
  }

  get(name: string): IProject | null {
    const projects = this.find({
      filters: [
        {
          name: 'name',
          operator: FilterOperator.Equal,
          value: name
        }
      ]
    });
    return projects.length ? projects[0] : null;
  }
}
