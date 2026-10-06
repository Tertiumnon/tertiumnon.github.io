import { Component, DestroyRef, inject, signal, computed } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { News } from "../../entities/news/news.types";
import { NewsService } from "../../entities/news/news.service";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";
import { MdContentComponent } from "../../components/md-content/md-content.component";

interface NewsWithContent extends News {
	content?: string;
	dirname: string;
	filename: string;
}

@Component({
	selector: "app-news",
	standalone: true,
	imports: [CommonModule, PageLoaderComponent, MdContentComponent],
	templateUrl: "./news.component.html",
	styleUrl: "./news.component.css",
})
export class NewsComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly newsService = inject(NewsService);

	allNews = signal<NewsWithContent[]>([]);
	isLoading = signal(true);
	currentLang = signal("en");

	filteredNews = computed(() => {
		return this.allNews().map((newsItem) => ({
			...newsItem,
			content: this.stripFirstHeading(newsItem.content || ""),
		}));
	});

	private stripFirstHeading(content: string): string {
		let cleaned = content.replace(/^---[\s\S]*?---\s*/, "");
		cleaned = cleaned.replace(/^#\s+.*?\n/, "").trim();
		return cleaned;
	}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((params) => {
				const lang = params["lang"] ?? "en";
				this.currentLang.set(lang);
				this.isLoading.set(true);

				this.newsService.getAll().subscribe({
					next: (response) => {
						const filtered = response.filter(
							(a: News) => a.language === lang && !a.isHidden
						);
						const sorted = filtered.sort(
							(a: News, b: News) =>
								new Date(b.publishedAt).getTime() -
								new Date(a.publishedAt).getTime()
						);

						const newsWithContent = sorted.map((newsItem) => ({
							...newsItem,
							content: "",
						}));

						this.allNews.set(newsWithContent);
						this.loadNewsContent(newsWithContent, lang);
					},
					error: (error: unknown) => {
						console.error("Failed to load news:", error);
						this.isLoading.set(false);
					},
				});
			});
	}

	private loadNewsContent(
		newsItems: NewsWithContent[],
		lang: string
	): void {
		let loadedCount = 0;
		const contentMap = new Map<string, string>();

		newsItems.forEach((newsItem) => {
			this.newsService
				.get({
					lang,
					name: newsItem.dirname,
					filename: newsItem.filename,
				})
				.subscribe({
					next: (content: string) => {
						contentMap.set(newsItem.dirname, content);
						loadedCount++;

						if (loadedCount === newsItems.length) {
							const updatedNews = newsItems.map((item) => ({
								...item,
								content: contentMap.get(item.dirname) || "",
							}));
							this.allNews.set(updatedNews);
							this.isLoading.set(false);
						}
					},
					error: (error: unknown) => {
						console.error(
							`Failed to load content for ${newsItem.dirname}:`,
							error
						);
					},
				});
		});
	}
}
