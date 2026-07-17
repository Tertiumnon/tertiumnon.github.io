import { Component, inject, signal, computed } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Post } from "../../entities/post/post";
import { PostService } from "../../entities/post/post.service";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";

@Component({
	selector: "app-post-404",
	standalone: true,
	imports: [CommonModule, RouterLink, PageLoaderComponent],
	templateUrl: "./post-404.component.html",
	styleUrl: "./post-404.component.css",
})
export class Post404Component {
	activatedRoute = inject(ActivatedRoute);
	PostService = inject(PostService);
	allPosts = signal<Post[]>([]);
	isLoading = signal(true);
	currentLang = signal("en");
	requestedPostDirname = signal("");

	similarPosts = computed(() => {
		const dirname = this.requestedPostDirname();
		if (!dirname) {
			return [];
		}

		const posts = this.allPosts()
			.filter((p) => p.language === this.currentLang())
			.filter((p) => p.category && !p.isHidden);

		return posts
			.filter((p) => this.calculateSimilarity(dirname, p.title) > 0)
			.sort((a, b) =>
				this.calculateSimilarity(dirname, b.title) -
				this.calculateSimilarity(dirname, a.title)
			)
			.sort(
				(a, b) =>
					new Date(b.publishedAt).getTime() -
					new Date(a.publishedAt).getTime()
			)
			.slice(0, 10);
	});

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			const lang = params["lang"] ?? "en";
			this.currentLang.set(lang);
			this.isLoading.set(true);

			this.PostService.getAll().subscribe((response) => {
				this.allPosts.set(response);
				this.isLoading.set(false);
			});
		});

		this.activatedRoute.queryParams.subscribe((queryParams) => {
			const dirname = queryParams["search"] ?? "";
			const postName = dirname.includes("--") ? dirname.split("--")[1] : dirname;
			this.requestedPostDirname.set(postName);
		});
	}

	private calculateSimilarity(searchTerm: string, postTitle: string): number {
		const search = searchTerm.toLowerCase().replace(/[-_]/g, " ").trim();
		const title = postTitle.toLowerCase();

		if (title === search) return 100;

		if (title.includes(search)) return 90;

		const searchWords = search
			.split(/\s+/)
			.filter((w) => w.length >= 3);

		if (searchWords.length === 0) return 0;

		const titleWords = title.split(/\W+/).filter((w) => w.length > 0);
		const matchCount = searchWords.filter((word) =>
			titleWords.some((titleWord) => titleWord === word)
		).length;

		if (matchCount === 0) return 0;

		return (matchCount / searchWords.length) * 80;
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
