import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EmulatorService } from "./emulator.service";

@Component({
	selector: "app-emulator",
	templateUrl: "./emulator.component.html",
	styleUrls: ["./emulator.component.less"],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class EmulatorComponent implements OnInit {
	lines$ = this.emulatorService.lines;
	isVisible$ = this.emulatorService.isVisible$;
	isCliEnabled$ = this.emulatorService.isCliEnabled$;
	command = "";

	constructor(private emulatorService: EmulatorService) {}

	ngOnInit(): void {
		this.emulatorService.command$.subscribe((command) => {
			this.command = command;
		});
	}

	onEnter(): void {
		this.emulatorService.enter(this.command);
	}
}
