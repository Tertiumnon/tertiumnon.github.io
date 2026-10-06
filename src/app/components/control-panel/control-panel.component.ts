import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { FilterConfig } from "./control-panel.types";

@Component({
	selector: "app-control-panel",
	templateUrl: "./control-panel.component.html",
	styleUrls: ["./control-panel.component.css"],
	standalone: true,
	imports: [CommonModule, DropdownComponent],
})
export class ControlPanelComponent {
	@Input() filters: FilterConfig[] = [];
}
