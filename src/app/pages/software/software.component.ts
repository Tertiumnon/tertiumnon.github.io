import { SidebarPageFiltersComponent } from "../../components/sidebar/sidebar-page-filters.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Component, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ProjectListComponent } from "../../components/project-list/project-list.component";
import { IProject } from "../../entities/project/project.types";
import { SoftwareService } from "./software.service";

@Component({
	selector: "app-software",
	templateUrl: "./software.component.html",
	imports: [CommonModule, ProjectListComponent, SidebarPageFiltersComponent, PageHeaderComponent],
	standalone: true,
})
export class SoftwareComponent implements OnInit {
	projects: IProject[] = [];

	constructor(private projectService: SoftwareService) {}

	ngOnInit(): void {
		this.projectService.projects$.subscribe((projects) => {
			this.projects = projects || [];
		});
	}
}
