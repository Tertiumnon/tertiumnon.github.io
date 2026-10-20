import { effect, Injectable, signal } from "@angular/core";

const NARROW_SCREEN_QUERY = "(max-width: 767px)";
const LAYOUT_STORAGE_KEY = "layout";
const DEFAULT_SIDEBAR_WIDTH = 240;
export const MIN_SIDEBAR_WIDTH = 160;
export const MAX_SIDEBAR_WIDTH = 420;

interface StoredLayout {
	sidebarOpen: boolean;
	sidebarWidth: number;
}

const clampWidth = (width: number): number =>
	Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, Math.round(width)));

function readStoredLayout(): StoredLayout | undefined {
	if (typeof localStorage === "undefined") return undefined;
	try {
		const parsed = JSON.parse(
			localStorage.getItem(LAYOUT_STORAGE_KEY) ?? "null",
		) as Partial<StoredLayout> | null;
		if (
			parsed &&
			typeof parsed.sidebarOpen === "boolean" &&
			typeof parsed.sidebarWidth === "number"
		) {
			return {
				sidebarOpen: parsed.sidebarOpen,
				sidebarWidth: clampWidth(parsed.sidebarWidth),
			};
		}
	} catch {
		// Storage access denied or the stored value is not valid JSON
	}
	return undefined;
}

function writeStoredLayout(layout: StoredLayout): void {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
	} catch {
		// Storage access denied or unavailable
	}
}

@Injectable({
	providedIn: "root",
})
export class LayoutService {
	private readonly stored = readStoredLayout();
	// A saved choice wins; otherwise the sidebar is expanded on wide screens and collapsed on narrow ones.
	readonly sidebarOpen = signal(
		this.stored?.sidebarOpen ??
			(typeof window === "undefined" ||
				!window.matchMedia(NARROW_SCREEN_QUERY).matches),
	);
	readonly sidebarWidth = signal(
		this.stored?.sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH,
	);
	// True while the user drags the sidebar edge, so the width follows the pointer without animation.
	readonly resizing = signal(false);

	constructor() {
		effect(() => {
			writeStoredLayout({
				sidebarOpen: this.sidebarOpen(),
				sidebarWidth: this.sidebarWidth(),
			});
		});

		if (typeof window !== "undefined") {
			window
				.matchMedia(NARROW_SCREEN_QUERY)
				.addEventListener("change", (event) => {
					this.sidebarOpen.set(!event.matches);
				});
		}
	}

	toggleSidebar(): void {
		this.sidebarOpen.update((open) => !open);
	}

	setSidebarWidth(width: number): void {
		this.sidebarWidth.set(clampWidth(width));
	}
}
