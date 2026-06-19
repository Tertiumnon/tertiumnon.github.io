import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-dropdown",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./dropdown.component.html",
	styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent {
	@Input() label = "";
	@Input() placeholder = "<Select>";
	@Input() selectedOption = "";
	@Input() options: string[] = [];
	@Output() selectedOptionChange = new EventEmitter<string>();
	isOpened = false;

	toggle(): void {
		this.isOpened = !this.isOpened;
	}

	onOptionClick(selectedOption: string, $event: Event): void {
		$event.stopPropagation();
		this.selectedOption = selectedOption;
		this.selectedOptionChange.emit(selectedOption);
		this.isOpened = false;
	}
}
