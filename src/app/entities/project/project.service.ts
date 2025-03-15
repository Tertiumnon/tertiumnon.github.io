import { Injectable } from "@angular/core";
import { IApiRequestFindParams } from "../../components/api/api-request-find.interface";
import { FilterOperator } from "../../components/filter/filter.interface";
import { IProject } from "./project.interface";
import PROJECT_ITEMS from "./project.mock";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  find(params: IApiRequestFindParams): IProject[] {
    const { filters } = params;
    let projects = [...PROJECT_ITEMS];
    if (filters.length) {
      for (const filter of filters) {
        projects = projects.filter((project) => project[filter.name] === filter.value);
      }
    }
    return projects;
  }

  get(name: string): IProject | null {
    const projects = this.find({
      filters: [
        {
          name: "name",
          operator: FilterOperator.Equal,
          value: name,
        },
      ],
    });
    return projects.length ? projects[0] : null;
  }
}
