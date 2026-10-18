import { Injectable, computed, signal } from "@angular/core";
import { Theme } from "./theme.constants";

const THEME_STORAGE_KEY = "theme";
const CODE_THEME_STORAGE_KEY = "codeTheme";
// Code blocks follow the page theme unless a palette is picked for them.
export const SAME_AS_THEME = "same";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	readonly themes = Object.values(Theme);
	readonly theme = signal<string>(this.getStoredTheme());
	readonly themeClass = computed(() => `theme-${this.theme()}`);
	readonly codeTheme = signal<string>(this.getStoredCodeTheme());
	readonly codeThemeKey = computed(() => (this.codeTheme() === SAME_AS_THEME ? this.theme() : this.codeTheme()));

	setCodeTheme(codeTheme: string): void {
		this.codeTheme.set(codeTheme);
		this.store(CODE_THEME_STORAGE_KEY, codeTheme);
	}

	private getStoredCodeTheme(): string {
		try {
			const stored = localStorage.getItem(CODE_THEME_STORAGE_KEY);
			if (stored === SAME_AS_THEME || (stored && this.themes.includes(stored as Theme))) {
				return stored;
			}
		} catch {
			// Storage access denied or unavailable
		}
		return SAME_AS_THEME;
	}

	private store(key: string, value: string): void {
		try {
			localStorage.setItem(key, value);
		} catch {
			// Storage access denied or unavailable
		}
	}

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
