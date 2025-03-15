import { Component, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ProjectControlPanelComponent } from "src/app/components/project-control-panel/project-control-panel.component";
import { ProjectListComponent } from "src/app/components/project-list/project-list.component";
import { IProject } from "../../entities/project/project.interface";
import { SoftwareService } from "./software.service";

@Component({
  selector: "app-software",
  templateUrl: "./software.component.html",
  standalone: true,
  imports: [CommonModule, ProjectListComponent, ProjectControlPanelComponent],
})
export class SoftwareComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: SoftwareService) {}

  ngOnInit(): void {
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    this.projectService.projects$.subscribe((projects) => (this.projects = projects || []));
  }
}
