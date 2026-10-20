import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { FONT_OPTIONS, FontKey, FontService } from "../font/font.service";
import { SelectFieldComponent } from "../form/select-field.component";
import { TerminalService } from "../terminal/terminal.service";
import { THEME_LABELS, Theme } from "../theme/theme";
import { ThemeService } from "../theme/theme.service";

@Component({
	selector: "app-status-bar",
	standalone: true,
	templateUrl: "./status-bar.component.html",
	styleUrl: "./status-bar.component.css",
	imports: [ReactiveFormsModule, SelectFieldComponent],
})
export class StatusBarComponent {
	private readonly destroyRef = inject(DestroyRef);
	readonly themeService = inject(ThemeService);
	readonly fontService = inject(FontService);
	readonly terminal = inject(TerminalService);
	readonly themeLabels = THEME_LABELS;
	readonly fontOptions = FONT_OPTIONS;
	readonly fontChoices = this.fontService.fonts.map((font) => ({
		value: font,
		label: FONT_OPTIONS[font].label,
	}));
	readonly themeChoices = this.themeService.themes.map((theme) => ({
		value: theme,
		label: THEME_LABELS[theme],
	}));
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
