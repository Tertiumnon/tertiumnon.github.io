import { Injectable, signal } from "@angular/core";

// Size (px) of the TV screen. The games read it when they start, so they fill the whole screen.
@Injectable({
	providedIn: "root",
})
export class ArcadeScreenService {
	readonly width = signal(640);
	readonly height = signal(420);
}
