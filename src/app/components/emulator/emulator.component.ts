import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, ViewEncapsulation } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { EmulatorService } from "./emulator.service";

@Component({
	selector: "app-emulator",
	templateUrl: "./emulator.component.html",
	styleUrls: ["./emulator.component.css"],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class EmulatorComponent {
	private readonly emulatorService = inject(EmulatorService);
	private readonly destroyRef = inject(DestroyRef);

	readonly lines$ = this.emulatorService.lines;
	readonly isVisible$ = this.emulatorService.isVisible$;
	readonly isCliEnabled$ = this.emulatorService.isCliEnabled$;
	command = "";

	ngOnInit(): void {
		this.emulatorService.command$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((command) => {
				this.command = command;
			});
	}

	onEnter(): void {
		this.emulatorService.enter(this.command);
	}
}
