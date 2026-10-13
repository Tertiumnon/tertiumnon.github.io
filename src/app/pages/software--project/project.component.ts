import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { IProject } from "../../entities/project/project.types";

@Component({
	selector: "app-project-page",
	imports: [CommonModule, DatePipe],
	templateUrl: "./project.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class ProjectPageComponent {
	readonly project: IProject;

	constructor() {
		const name = inject(ActivatedRoute).snapshot.paramMap.get("name");
		const project = PROJECT_ITEMS.find((item) => item.name === name);
		if (!project) throw new Error(`Unknown project: ${name}`);
		this.project = project;
	}
}
