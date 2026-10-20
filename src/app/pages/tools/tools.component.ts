import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { ProjectListComponent } from "../../components/project-list/project-list.component";
import { TOOL_ITEMS } from "../../entities/project/project.mock";

@Component({
	selector: "app-tools",
	standalone: true,
	imports: [CommonModule, ProjectListComponent, PageHeaderComponent],
	templateUrl: "./tools.component.html",
	styleUrl: "./tools.component.css",
})
export class ToolsComponent {
	readonly tools = TOOL_ITEMS;
}
