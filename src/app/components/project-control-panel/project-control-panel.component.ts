import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
	ProjectLicense,
	ProjectStatus,
} from "../../entities/project/project.constants";
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
	readonly release = "Updated (newer)";
	readonly releaseOptions = ["Updated (newer)", "Updated (older)"];
	readonly releaseMap: Record<string, string> = {
		[this.releaseOptions[0]]: "updatedAt",
		[this.releaseOptions[1]]: "-updatedAt",
	};

	onStatusChange(status: string): void {
		this.projectService.setState({ filterByStatus: status as ProjectStatus });
	}

	readonly license = "all";
	readonly licenseOptions = ["all", ...Object.values(ProjectLicense)];

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
