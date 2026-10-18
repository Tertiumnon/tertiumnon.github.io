import { computed, Injectable, signal } from "@angular/core";

// Font families for the page text; the fonts are loaded in index.html or bundled in assets.
export const FONT_OPTIONS = {
	ubuntu: { label: "Ubuntu", family: `"Ubuntu Nerd Font", system-ui, sans-serif` },
	openSans: { label: "Open Sans", family: `"Open Sans", sans-serif` },
	robotoCondensed: { label: "Roboto Condensed", family: `"Roboto Condensed", sans-serif` },
	jetBrainsMono: { label: "JetBrains Mono", family: `"JetBrains Mono", monospace` },
} as const;

export type FontKey = keyof typeof FONT_OPTIONS;

const FONT_STORAGE_KEY = "font";
const DEFAULT_FONT: FontKey = "jetBrainsMono";

@Injectable({
	providedIn: "root",
})
export class FontService {
	readonly fonts = Object.keys(FONT_OPTIONS) as FontKey[];
	readonly font = signal<FontKey>(this.getStoredFont());
	readonly family = computed(() => FONT_OPTIONS[this.font()].family);

	setFont(font: FontKey): void {
		this.font.set(font);
		if (typeof localStorage !== "undefined") {
			try {
				localStorage.setItem(FONT_STORAGE_KEY, font);
			} catch {
				// Storage access denied or unavailable
			}
		}
	}

	private getStoredFont(): FontKey {
		if (typeof localStorage === "undefined") return DEFAULT_FONT;
		try {
			const stored = localStorage.getItem(FONT_STORAGE_KEY);
			if (stored && stored in FONT_OPTIONS) return stored as FontKey;
		} catch {
			// Storage access denied or unavailable
		}
		return DEFAULT_FONT;
	}
}
