import { effect, Injectable, signal } from "@angular/core";

const TERMINAL_STORAGE_KEY = "terminal";

function readTerminalOpen(): boolean {
	if (typeof localStorage === "undefined") return false;
	try {
		return localStorage.getItem(TERMINAL_STORAGE_KEY) === "open";
	} catch {
		// Storage access denied or unavailable
		return false;
	}
}

@Injectable({
	providedIn: "root",
})
export class TerminalService {
	readonly open = signal(readTerminalOpen());

	constructor() {
		effect(() => {
			if (typeof localStorage === "undefined") return;
			try {
				localStorage.setItem(
					TERMINAL_STORAGE_KEY,
					this.open() ? "open" : "closed",
				);
			} catch {
				// Storage access denied or unavailable
			}
		});
	}

	toggle(): void {
		this.open.update((isOpen) => !isOpen);
	}
}
