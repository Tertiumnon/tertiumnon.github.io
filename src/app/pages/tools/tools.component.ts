import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectListComponent } from "../../components/project-list/project-list.component";
import { TOOL_ITEMS } from "../../entities/project/project.mock";

@Component({
	selector: "app-tools",
	standalone: true,
	imports: [CommonModule, ProjectListComponent],
	templateUrl: "./tools.component.html",
	styleUrl: "./tools.component.css",
})
export class ToolsComponent {
	readonly tools = TOOL_ITEMS;
}
