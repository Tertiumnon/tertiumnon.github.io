import { Injectable, signal } from "@angular/core";

// Filter state for the changelog page; the sidebar shows the controls, the changelog page applies them.
@Injectable({
	providedIn: "root",
})
export class ChangelogFilterService {
	readonly projects = signal<string[]>(["All"]);
	readonly selectedProject = signal("All");
}
