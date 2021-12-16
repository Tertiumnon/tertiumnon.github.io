import { Component, OnInit } from "@angular/core";

import { PortfolioProjectService } from "../../shared/project/portfolio-project.service";
import { IProject } from "../../shared/project/project";

@Component({
  selector: "app-post-mortem",
  templateUrl: "./post-mortem.component.html",
  styleUrls: ["./post-mortem.component.less"],
})
export class PostMortemComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: PortfolioProjectService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe((projects) => (this.projects = projects || []));
  }
}
