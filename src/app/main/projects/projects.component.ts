import { Component, OnInit } from "@angular/core";

import { IProject } from "../../shared/project/project";
import { ProjectService } from "../../shared/project/project.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.less"],
})
export class ProjectsComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe((projects) => (this.projects = projects || []));
  }
}
