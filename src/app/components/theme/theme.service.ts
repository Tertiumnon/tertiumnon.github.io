import { Injectable, computed, signal } from "@angular/core";
import { Theme } from "./theme.constants";

const THEME_STORAGE_KEY = "theme";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	readonly themes = Object.values(Theme);
	readonly theme = signal<string>(this.getStoredTheme());
	readonly themeClass = computed(() => `theme-${this.theme()}`);

	private getStoredTheme(): string {
		if (typeof localStorage === "undefined") {
			return Theme.Coder;
		}
		try {
			const stored = localStorage.getItem(THEME_STORAGE_KEY);
			if (stored && this.themes.includes(stored as Theme)) {
				return stored;
			}
			localStorage.removeItem(THEME_STORAGE_KEY);
		} catch {
			// Storage access denied or unavailable
		}
		return Theme.Coder;
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
