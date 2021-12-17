import { Component, OnInit } from "@angular/core";

import { PortfolioProjectService } from "../../shared/project/portfolio-project.service";
import { IProject } from "../../shared/project/project";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.less"],
})
export class PortfolioComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: PortfolioProjectService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe((projects) => (this.projects = projects || []));
  }
}
