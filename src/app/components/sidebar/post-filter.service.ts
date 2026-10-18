import { Injectable, signal } from "@angular/core";

// Filter state for the posts page; the sidebar shows the controls, the posts page applies them.
@Injectable({
	providedIn: "root",
})
export class PostFilterService {
	readonly categories = signal<string[]>(["All"]);
	readonly tags = signal<string[]>(["All"]);
	readonly selectedCategory = signal("All");
	readonly selectedTag = signal("All");
}
