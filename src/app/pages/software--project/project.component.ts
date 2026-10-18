import {
	ChangeDetectionStrategy,
	Component,
	Signal,
	inject,
	signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { catchError, of } from "rxjs";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { IProject } from "../../entities/project/project.types";
import { MdContentComponent } from "../../components/md-content/md-content.component";

@Component({
	selector: "app-project-page",
	imports: [CommonModule, DatePipe, MdContentComponent],
	templateUrl: "./project.component.html",
	styleUrl: "./project.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class ProjectPageComponent {
	private readonly http = inject(HttpClient);
	readonly project: IProject;
	// README is generated at build time for public GitHub projects; other projects use the custom page only.
	readonly readme: Signal<string>;

	constructor() {
		const name = inject(ActivatedRoute).snapshot.paramMap.get("name");
		const project = PROJECT_ITEMS.find((item) => item.name === name);
		if (!project) throw new Error(`Unknown project: ${name}`);
		this.project = project;
		this.readme = project.readme
			? toSignal(
					this.http
						.get(`assets/projects/${project.name}.md`, { responseType: "text" })
						.pipe(catchError(() => of(""))),
					{ initialValue: "" },
			  )
			: signal("");
	}
}
