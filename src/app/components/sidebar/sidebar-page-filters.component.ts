import { Component, computed, inject } from "@angular/core";
import { EditorTabsService } from "../editor-tabs/editor-tabs.service";
import { ProjectControlPanelComponent } from "../project-control-panel/project-control-panel.component";
import { ChangelogFilterService } from "./changelog-filter.service";
import { PostFilterService } from "./post-filter.service";

// Filters under the sidebar search. Each page has its own set; the set follows the open page.
@Component({
	selector: "app-sidebar-page-filters",
	standalone: true,
	templateUrl: "./sidebar-page-filters.component.html",
	styleUrl: "./sidebar-page-filters.component.css",
	imports: [ProjectControlPanelComponent],
})
export class SidebarPageFiltersComponent {
	private readonly tabs = inject(EditorTabsService);
	readonly changelog = inject(ChangelogFilterService);
	readonly posts = inject(PostFilterService);

	// The page key is the single path segment of a list page (/projects, /en/changelog, /en/posts).
	readonly page = computed(() => {
		const segments = this.tabs.activeUrl().split("/").filter((segment) => segment.length > 0);
		if (segments.length > 0 && ["en", "ru"].includes(segments[0])) segments.shift();
		return segments.length === 1 ? segments[0] : "";
	});

	onChangelogProject(event: Event): void {
		this.changelog.selectedProject.set((event.target as HTMLSelectElement).value);
	}

	onPostCategory(event: Event): void {
		this.posts.selectedCategory.set((event.target as HTMLSelectElement).value);
	}

	onPostTag(event: Event): void {
		this.posts.selectedTag.set((event.target as HTMLSelectElement).value);
	}
}
