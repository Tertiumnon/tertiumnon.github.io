import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
	selector: "app-news-control-panel",
	templateUrl: "./news-control-panel.component.html",
	styleUrls: ["./news-control-panel.component.css"],
	standalone: true,
	imports: [CommonModule, DropdownComponent],
})
export class NewsControlPanelComponent {
	@Input() projects: string[] = [];
	@Input() selectedProject: string = "All";
	@Input() onProjectChange: (project: string) => void = () => {};
}
