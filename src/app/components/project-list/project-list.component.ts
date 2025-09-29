import { Component, Input } from "@angular/core";

import { NgFor } from "@angular/common";
import { IProject } from "../../entities/project/project.interface";
import { ProjectCardComponent } from "../project-card/project-card.component";

@Component({
    selector: "app-project-list",
    templateUrl: "./project-list.component.html",
    imports: [NgFor, ProjectCardComponent]
})
export class ProjectListComponent {
  @Input() defaultImagePreview = "/assets/images/projects/default/default.png";
  @Input() projects: IProject[] = [];
}
