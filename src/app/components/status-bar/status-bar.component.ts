import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Theme, THEME_LABELS } from "../theme/theme";
import { ThemeService } from "../theme/theme.service";
import { TerminalService } from "../terminal/terminal.service";
import { FONT_OPTIONS, FontKey, FontService } from "../font/font.service";

@Component({
	selector: "app-status-bar",
	standalone: true,
	templateUrl: "./status-bar.component.html",
	styleUrl: "./status-bar.component.css",
	imports: [ReactiveFormsModule],
})
export class StatusBarComponent {
	private readonly destroyRef = inject(DestroyRef);
	readonly themeService = inject(ThemeService);
	readonly fontService = inject(FontService);
	readonly terminal = inject(TerminalService);
	readonly themeLabels = THEME_LABELS;
	readonly fontOptions = FONT_OPTIONS;
	readonly themeCtrl = new FormControl(this.themeService.theme());
	readonly fontCtrl = new FormControl(this.fontService.font());

	constructor() {
		this.themeCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((theme) => this.themeService.setTheme(theme as Theme));
		this.fontCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((font) => this.fontService.setFont(font as FontKey));
	}
}
