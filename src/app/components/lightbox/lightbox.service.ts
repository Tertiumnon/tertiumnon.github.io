import { Injectable, signal } from "@angular/core";

// The image shown in the popup; null when the popup is closed.
@Injectable({
	providedIn: "root",
})
export class LightboxService {
	readonly src = signal<string | null>(null);

	open(src: string): void {
		this.src.set(src);
	}

	close(): void {
		this.src.set(null);
	}
}
