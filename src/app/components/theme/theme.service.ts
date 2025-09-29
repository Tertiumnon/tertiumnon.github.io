import { Injectable, signal } from "@angular/core";
import { Theme } from "./theme";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	themes = Object.values(Theme);
	theme = signal<string>("");

	constructor() {
		this.theme.set(localStorage.getItem("theme") || Theme.Coder);
	}

	setTheme(theme: Theme) {
		this.theme.set(theme);
		localStorage.setItem("theme", theme);
	}
}
