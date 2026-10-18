import { Injectable, signal } from "@angular/core";

export const POST_SORTS = ["Newest created", "Oldest created", "Recently updated", "Title A-Z"] as const;

// Filter state for the posts page; the sidebar shows the controls, the posts page applies them.
@Injectable({
	providedIn: "root",
})
export class PostFilterService {
	readonly categories = signal<string[]>(["All"]);
	readonly tags = signal<string[]>(["All"]);
	readonly sorts: string[] = [...POST_SORTS];
	readonly selectedCategory = signal("All");
	readonly selectedTag = signal("All");
	readonly selectedSort = signal<string>(POST_SORTS[0]);
}
