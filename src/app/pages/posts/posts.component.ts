import { CommonModule } from "@angular/common";
import {
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
	signal,
	untracked,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { LoadMoreComponent } from "../../components/load-more/load-more.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { PostFilterService } from "../../components/sidebar/post-filter.service";
import { SidebarPageFiltersComponent } from "../../components/sidebar/sidebar-page-filters.component";
import { PostService } from "../../entities/post/post.service";
import { Post } from "../../entities/post/post.types";

const POSTS_PER_BATCH = 10;

const time = (date: string | undefined): number =>
	new Date(date ?? 0).getTime();

// When a post last changed: the later of its publish and update dates.
const lastActivity = (post: Post): number =>
	Math.max(time(post.publishedAt), time(post.updatedAt));

@Component({
	selector: "app-posts",
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,
		SidebarPageFiltersComponent,
		PageHeaderComponent,
		LoadMoreComponent,
	],
	templateUrl: "./posts.component.html",
	styleUrl: "./posts.component.css",
})
export class PostsComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly postService = inject(PostService);
	readonly filters = inject(PostFilterService);

	allPosts = signal<Post[]>([]);
	isLoading = signal(true);
	visibleCount = signal(POSTS_PER_BATCH);

	sortedPosts = computed(() => {
		let filtered = this.allPosts();

		filtered = filtered.filter((a) => a.category);

		const category = this.filters.selectedCategory();
		if (category !== "All") {
			filtered = filtered.filter((a) => a.category === category);
		}

		const tag = this.filters.selectedTag();
		if (tag !== "All") {
			filtered = filtered.filter((a) =>
				Array.isArray(a.tags) ? a.tags.includes(tag) : false,
			);
		}

		const sort = this.filters.selectedSort();
		if (sort === "Title A-Z") {
			return filtered.sort((a, b) => a.title.localeCompare(b.title));
		}
		if (sort === "Recently updated") {
			return filtered.sort(
				(a, b) =>
					lastActivity(b) - lastActivity(a) ||
					time(b.publishedAt) - time(a.publishedAt),
			);
		}
		const newestFirst = sort === "Newest created" ? 1 : -1;
		return filtered.sort(
			(a, b) =>
				newestFirst *
				(new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
		);
	});

	visiblePosts = computed(() =>
		this.sortedPosts().slice(0, this.visibleCount()),
	);

	loadMore(): void {
		this.visibleCount.update((count) => count + POSTS_PER_BATCH);
	}

	constructor() {
		// A new filter starts again from the first batch.
		effect(() => {
			this.filters.selectedCategory();
			this.filters.selectedTag();
			untracked(() => this.visibleCount.set(POSTS_PER_BATCH));
		});
	}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((params) => {
				const lang = params["lang"] ?? "en";
				this.isLoading.set(true);

				this.postService.getAll().subscribe({
					next: (response) => {
						const filtered = response.filter(
							(a: Post) => a.language === lang && !a.isHidden,
						);
						const sorted = filtered.sort(
							(a: Post, b: Post) =>
								new Date(b.publishedAt).getTime() -
								new Date(a.publishedAt).getTime(),
						);
						this.allPosts.set(sorted);

						const categories = new Set(
							sorted.filter((a) => a.category).map((a) => a.category),
						);
						this.filters.categories.set([
							"All",
							...Array.from(categories).sort(),
						]);
						const tags = new Set<string>();
						for (const item of sorted) {
							for (const tag of item.tags ?? []) tags.add(tag);
						}
						this.filters.tags.set(["All", ...Array.from(tags).sort()]);

						this.isLoading.set(false);
					},
					error: (error: unknown) => {
						console.error("Failed to fetch posts:", error);
						this.isLoading.set(false);
					},
				});
			});
	}

	getPostLink(link: string): (string | number)[] {
		const segments = link.split("/").filter((s): s is string => s.length > 0);
		return ["/", ...segments];
	}

	getCategoryDisplay(category: string): string {
		const categoryMap: { [key: string]: string } = {
			"Dev Tools": "Dev Tools",
			OS: "OS",
			Programming: "Programming",
			Databases: "Databases",
			Browsers: "Browsers",
			Career: "Career",
			Design: "Design",
		};
		return categoryMap[category] || category;
	}
}
