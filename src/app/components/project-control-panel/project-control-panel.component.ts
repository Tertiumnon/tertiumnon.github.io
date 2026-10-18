import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {

	ProjectStatus,
} from "../../entities/project/project.constants";
import { ProjectsService } from "../../pages/projects/projects.service";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { SelectFieldComponent, selectOptions } from "../form/select-field.component";

const STATUS_KEY = "status";
const RELEASE_KEY = "release";
const LICENSE_SHORT_NAMES: Record<string, string> = {
	"MIT License": "MIT",
	"Creative Commons Attribution 4.0 International": "CC BY 4.0",
};
const shortLicense = (license: string): string => LICENSE_SHORT_NAMES[license] ?? license;

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
	// Options are the licences the projects actually declare, as GitHub reports them.
	// Options show short names; the filter maps them back to the full licence name.
	readonly licenseOptions = [
		"all",
		...Array.from(new Set(PROJECT_ITEMS.map((project) => project.repoLicense).filter((license): license is string => !!license)))
			.map(shortLicense)
			.sort(),
	];
	readonly licenseSelectOptions = selectOptions(this.licenseOptions);

	onLicenseChange(license: string): void {
		const fullName = PROJECT_ITEMS.map((project) => project.repoLicense).find((name) => name && shortLicense(name) === license);
		this.projectService.setState({ filterByLicense: fullName ?? license });
	}

	onReleaseChange(release: string): void {
		this.projectService.setState({ sortByAttrVal: this.releaseMap[release] });
	}

	ngOnInit(): void {
		this.onReleaseChange(this.release);
		this.onStatusChange(this.status);
	}
}
