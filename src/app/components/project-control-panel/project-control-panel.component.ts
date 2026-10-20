import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, DestroyRef, inject, type OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
	ProjectLicense,
	ProjectStatus,
} from "../../entities/project/project.constants";
import { ProjectsService } from "../../pages/projects/projects.service";
import {
	SelectFieldComponent,
	type SelectOption,
	selectOptions,
} from "../form/select-field.component";

const STATUS_KEY = "status";
const RELEASE_KEY = "release";
@Component({
	selector: "app-project-control-panel",
	templateUrl: "./project-control-panel.component.html",
	styleUrls: ["./project-control-panel.component.css"],
	standalone: true,
	imports: [CommonModule, SelectFieldComponent],
})
export class ProjectControlPanelComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly document = inject(DOCUMENT);
	private readonly projectService = inject(ProjectsService);

	readonly isStatusFilterVisible = true;
	readonly status = ProjectStatus.Active.toString();
	readonly statusOptions = Object.values(ProjectStatus);
	readonly statusSelectOptions = selectOptions(this.statusOptions);
	readonly release = "Updated (newer)";
	readonly releaseOptions = ["Updated (newer)", "Updated (older)"];
	readonly releaseSelectOptions = selectOptions(this.releaseOptions);
	readonly releaseMap: Record<string, string> = {
		[this.releaseOptions[0]]: "updatedAt",
		[this.releaseOptions[1]]: "-updatedAt",
	};

	onStatusChange(status: string): void {
		this.projectService.setState({ filterByStatus: status as ProjectStatus });
	}

	readonly license = "all";
	readonly licenseSelectOptions: SelectOption[] = [
		{ value: "all", label: "All" },
		{ value: ProjectLicense.Free, label: "Freeware" },
		{ value: ProjectLicense.OpenSource, label: "OpenSource" },
	];

	onLicenseChange(license: string): void {
		this.projectService.setState({ filterByLicense: license });
	}

	onReleaseChange(release: string): void {
		this.projectService.setState({ sortByAttrVal: this.releaseMap[release] });
	}

	ngOnInit(): void {
		this.onReleaseChange(this.release);
		this.onStatusChange(this.status);
	}
}
