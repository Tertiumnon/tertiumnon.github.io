import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IProject } from "../../entities/project/project.types";
import { languageIconPath } from "../../entities/project/project.icons";

@Component({
	selector: "app-project-card",
	templateUrl: "./project-card.component.html",
	styleUrls: ["./project-card.component.css"],
	standalone: true,
	imports: [DatePipe],
})
export class ProjectCardComponent {
	@Input() project?: IProject;
	readonly languageIconPath = languageIconPath;
}
