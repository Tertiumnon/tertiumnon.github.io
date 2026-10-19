import {
	ChangeDetectionStrategy,
	Component,
	Signal,
	inject,
	signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { catchError, of } from "rxjs";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { IProject } from "../../entities/project/project.types";
import { MdContentComponent } from "../../components/md-content/md-content.component";

// Sub pages of a project: /projects/<name>/<view>, for example /projects/<name>/readme.
export type ProjectView = "readme" | "changelog" | "screenshots" | "downloads" | "license" | "links";
const VIEWS: ProjectView[] = ["readme", "changelog", "screenshots", "downloads", "license", "links"];

@Component({
	selector: "app-project-page",
	imports: [CommonModule, DatePipe, MdContentComponent, RouterLink, RouterLinkActive],
	templateUrl: "./project.component.html",
	styleUrl: "./project.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class ProjectPageComponent {
	private readonly http = inject(HttpClient);
	private readonly route = inject(ActivatedRoute);
	readonly project: IProject;
	readonly view: ProjectView;
	// Markdown of the current sub page, generated at build time for public GitHub projects; empty when the repository has none.
	readonly markdown: Signal<string>;

	constructor() {
		const name = this.route.snapshot.paramMap.get("name");
		const project = PROJECT_ITEMS.find((item) => item.name === name);
		if (!project) throw new Error(`Unknown project: ${name}`);
		this.project = project;
		const view = this.route.snapshot.data["view"];
		this.view = VIEWS.includes(view) ? view : "readme";

		const markdownFile =
			this.view === "readme" ? project.readme : this.view === "changelog" ? project.changelog : this.view === "license" ? project.licenseText : false;
		const file =
			this.view === "changelog" ? `${project.name}.changelog.md` : this.view === "license" ? `${project.name}.license.txt` : `${project.name}.md`;
		this.markdown = markdownFile
			? toSignal(
					this.http
						.get(`assets/projects/${file}`, { responseType: "text" })
						.pipe(catchError(() => of(""))),
					{ initialValue: "" },
			  )
			: signal("");
	}
}
