import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { ProjectListComponent } from "../../components/project-list/project-list.component";
import { SidebarPageFiltersComponent } from "../../components/sidebar/sidebar-page-filters.component";
import { IProject } from "../../entities/project/project.types";
import { ProjectsService } from "./projects.service";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	imports: [
		CommonModule,
		ProjectListComponent,
		SidebarPageFiltersComponent,
		PageHeaderComponent,
	],
	standalone: true,
})
export class ProjectsComponent implements OnInit {
	projects: IProject[] = [];

	constructor(private projectService: ProjectsService) {}

	ngOnInit(): void {
		this.projectService.projects$.subscribe((projects) => {
			this.projects = projects || [];
		});
	}
}
