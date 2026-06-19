import { Component, inject, signal, computed } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Post } from "../../entities/post/post";
import { PostService } from "../../entities/post/post.service";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";
import { PostControlPanelComponent } from "../../components/post-control-panel/post-control-panel.component";

@Component({
	selector: "app-posts",
	standalone: true,
	imports: [CommonModule, RouterLink, PageLoaderComponent, PostControlPanelComponent],
	templateUrl: "./posts.component.html",
	styleUrl: "./posts.component.css",
})
export class PostsComponent {
	activatedRoute = inject(ActivatedRoute);
	PostService = inject(PostService);
	allPosts = signal<Post[]>([]);
	isLoading = signal(true);
	selectedCategory = signal("All");
	selectedTag = signal("All");

	categories = computed(() => {
		const cats = new Set(this.allPosts()
			.filter((a) => a.category)
			.map((a) => a.category));
		return ["All", ...Array.from(cats).sort()];
	});

	tags = computed(() => {
		const allTags = new Set<string>();
		this.allPosts().forEach((a) => {
			if (Array.isArray(a.tags)) {
				a.tags.forEach((tag: string) => allTags.add(tag));
			}
		});
		return ["All", ...Array.from(allTags).sort()];
	});

	categorizedPosts = computed(() => {
		let filtered = this.allPosts();

		// Filter out articles without a category
		filtered = filtered.filter((a) => a.category);

		if (this.selectedCategory() !== "All") {
			filtered = filtered.filter((a) => a.category === this.selectedCategory());
		}

		if (this.selectedTag() !== "All") {
			filtered = filtered.filter((a) =>
				Array.isArray(a.tags) ? a.tags.includes(this.selectedTag()) : false
			);
		}

		const byCategory = new Map<string, Post[]>();

		filtered.forEach((article) => {
			const displayCategory = article.category.charAt(0).toUpperCase() + article.category.slice(1);
			if (!byCategory.has(displayCategory)) {
				byCategory.set(displayCategory, []);
			}
			byCategory.get(displayCategory)!.push(article);
		});

		const sorted = Array.from(byCategory.entries()).sort((a, b) => a[0].localeCompare(b[0]));
		return sorted;
	});

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			const lang = params["lang"] ?? "en";
			this.isLoading.set(true);
			this.PostService.getAll().subscribe((response) => {
				const filtered = response.filter((a: Post) => a.language === lang && !a.isHidden);
				const sorted = filtered.sort(
					(a: Post, b: Post) =>
						new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
				);
				this.allPosts.set(sorted);
				this.isLoading.set(false);
			});
		});
	}

	onCategoryChange(category: string): void {
		this.selectedCategory.set(category);
	}

	onTagChange(tag: string): void {
		this.selectedTag.set(tag);
	}

	getPostLink(link: string): (string | number)[] {
		const segments = link.split('/').filter((s): s is string => s.length > 0);
		return ['/', ...segments];
	}
}
