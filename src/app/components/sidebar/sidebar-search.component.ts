import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { catchError, of } from "rxjs";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { PostService } from "../../entities/post/post.service";
import { Post } from "../../entities/post/post.types";

interface SearchResult {
	kind: "project" | "post";
	title: string;
	detail: string;
	link: string;
}

export type SearchScope = "project" | "post";

const MAX_RESULTS = 30;

// VS Code style search under the menu: the scope dropdown picks projects or posts, the input filters them.
@Component({
	selector: "app-sidebar-search",
	standalone: true,
	templateUrl: "./sidebar-search.component.html",
	styleUrl: "./sidebar-search.component.css",
	imports: [RouterLink],
})
export class SidebarSearchComponent {
	private readonly postService = inject(PostService);
	readonly query = signal("");
	readonly scope = signal<SearchScope>("project");
	private readonly posts = toSignal(
		this.postService.getAll().pipe(catchError(() => of([] as Post[]))),
		{ initialValue: [] as Post[] },
	);

	readonly results = computed<SearchResult[]>(() => {
		const needle = this.query().trim().toLowerCase();
		if (!needle) return [];

		if (this.scope() === "project") {
			return PROJECT_ITEMS.filter((project) =>
				[project.title, project.name, project.type, project.description].some((value) =>
					value?.toLowerCase().includes(needle),
				),
			)
				.slice(0, MAX_RESULTS)
				.map((project) => ({
					kind: "project" as const,
					title: project.title,
					detail: project.type ?? "",
					link: `/projects/${project.name}`,
				}));
		}

		return this.posts()
			.filter((post) => post.language === "en" && !post.isHidden && post.title.toLowerCase().includes(needle))
			.slice(0, MAX_RESULTS)
			.map((post) => ({ kind: "post" as const, title: post.title, detail: post.category, link: post.link }));
	});

	onInput(event: Event): void {
		this.query.set((event.target as HTMLInputElement).value);
	}

	onScope(event: Event): void {
		this.scope.set((event.target as HTMLSelectElement).value as SearchScope);
	}
}
