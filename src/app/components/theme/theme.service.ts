import { Injectable, signal } from "@angular/core";
import { Theme } from "./theme.constants";

const THEME_STORAGE_KEY = "theme";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	readonly themes = Object.values(Theme);
	readonly theme = signal<string>(this.getStoredTheme() ?? Theme.Coder);

	private getStoredTheme(): string | null {
		if (typeof localStorage === "undefined") {
			return null;
		}
		try {
			return localStorage.getItem(THEME_STORAGE_KEY);
		} catch {
			return null;
		}
	}

	setTheme(theme: Theme): void {
		this.theme.set(theme);
		if (typeof localStorage !== "undefined") {
			try {
				localStorage.setItem(THEME_STORAGE_KEY, theme);
			} catch {
				// Storage access denied or unavailable
			}
		}
	}
}
