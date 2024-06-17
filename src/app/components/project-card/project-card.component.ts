import { Component, Input } from "@angular/core";
import { IProject } from "../../entities/project/project.interface";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-project-card",
    templateUrl: "./project-card.component.html",
    styleUrls: ["./project-card.component.less"],
    standalone: true,
    imports: [NgIf]
})
export class ProjectCardComponent {
  @Input() project?: IProject;
}
