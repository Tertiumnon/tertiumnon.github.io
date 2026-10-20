import { Component, computed, inject } from "@angular/core";
import { EditorTabsService } from "../editor-tabs/editor-tabs.service";
import {
	SelectFieldComponent,
	selectOptions,
} from "../form/select-field.component";
import { ProjectControlPanelComponent } from "../project-control-panel/project-control-panel.component";
import { PostFilterService } from "./post-filter.service";

// Filters of the open list page. Every page uses the same dropdown control.
@Component({
	selector: "app-sidebar-page-filters",
	standalone: true,
	templateUrl: "./sidebar-page-filters.component.html",
	styleUrl: "./sidebar-page-filters.component.css",
	imports: [ProjectControlPanelComponent, SelectFieldComponent],
})
export class SidebarPageFiltersComponent {
	private readonly tabs = inject(EditorTabsService);
	readonly posts = inject(PostFilterService);
	readonly categoryOptions = computed(() =>
		selectOptions(this.posts.categories()),
	);
	readonly tagOptions = computed(() => selectOptions(this.posts.tags()));
	readonly sortOptions = selectOptions(this.posts.sorts);

	// The page key is the single path segment of a list page (/projects, /en/changelog, /en/posts).
	readonly page = computed(() => {
		const segments = this.tabs
			.activeUrl()
			.split("/")
			.filter((segment) => segment.length > 0);
		if (segments.length > 0 && ["en", "ru"].includes(segments[0]))
			segments.shift();
		return segments.length === 1 ? segments[0] : "";
	});
}
