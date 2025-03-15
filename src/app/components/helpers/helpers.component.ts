import { Component } from "@angular/core";

import { IProject } from "../../entities/project/project.interface";

@Component({
  selector: "app-helpers",
  templateUrl: "./helpers.component.html",
  styleUrls: ["./helpers.component.less"],
  standalone: true,
})
export class HelpersComponent {
  static orderBy(list: any, ...args: any[]) {
    const direction = args[0][0];
    const column = direction === "-" ? args[0].slice(1) : args[0];
    const newList = [...list];
    newList.sort((a: any, b: any) => {
      if (a[column] < b[column]) {
        return direction === "-" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === "-" ? 1 : -1;
      }
      return 0;
    });
    return newList;
  }

  filterBy(projectList: any, param: string, value: string | undefined) {
    const newProjectList = [...projectList] as IProject[];
    if (!value || value === "all") return projectList;
    switch (param) {
      case "status":
        return newProjectList.filter((project) => project.status === value);
      case "workType":
        return newProjectList.filter((project) => project.workTypes.includes(value));
      default:
        break;
    }
  }
}
