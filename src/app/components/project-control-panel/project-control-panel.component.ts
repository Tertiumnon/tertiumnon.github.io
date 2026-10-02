import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ProjectStatus } from "../../entities/project/project.constants";
import { SoftwareService } from "../../pages/software/software.service";
import { DropdownComponent } from "../dropdown/dropdown.component";

const STATUS_KEY = "status";
const RELEASE_KEY = "release";

@Component({
	selector: "app-project-control-panel",
	templateUrl: "./project-control-panel.component.html",
	styleUrls: ["./project-control-panel.component.css"],
	standalone: true,
	imports: [CommonModule, DropdownComponent],
})
export class ProjectControlPanelComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly document = inject(DOCUMENT);
	private readonly projectService = inject(SoftwareService);

	readonly isStatusFilterVisible = true;
	readonly status = ProjectStatus.Active.toString();
	readonly statusOptions = Object.values(ProjectStatus);
	readonly release = "Year (newer)";
	readonly releaseOptions = ["Year (newer)", "Year (older)"];
	readonly releaseMap: Record<string, string> = {
		[this.releaseOptions[0]]: "year",
		[this.releaseOptions[1]]: "-year",
	};

	onStatusChange(status: string): void {
		this.projectService.setState({ filterByStatus: status as ProjectStatus });
	}

	onReleaseChange(release: string): void {
		this.projectService.setState({ sortByAttrVal: this.releaseMap[release] });
	}

	ngOnInit(): void {
		this.onReleaseChange(this.release);
		this.onStatusChange(this.status);
	}
}
