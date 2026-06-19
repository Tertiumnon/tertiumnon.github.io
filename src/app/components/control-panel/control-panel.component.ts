import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "../dropdown/dropdown.component";

export interface FilterConfig {
	label: string;
	value: string;
	options: string[];
	onChange: (value: string) => void;
}

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
