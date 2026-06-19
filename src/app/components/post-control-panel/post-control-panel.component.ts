import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
	selector: "app-post-control-panel",
	templateUrl: "./post-control-panel.component.html",
	styleUrls: ["./post-control-panel.component.css"],
	standalone: true,
	imports: [CommonModule, DropdownComponent],
})
export class PostControlPanelComponent {
	@Input() categories: string[] = [];
	@Input() selectedCategory: string = "All";
	@Input() onCategoryChange: (category: string) => void = () => {};

	@Input() tags: string[] = [];
	@Input() selectedTag: string = "All";
	@Input() onTagChange: (tag: string) => void = () => {};
}
