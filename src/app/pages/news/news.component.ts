import { Component, inject, signal, computed } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { News } from "../../entities/news/news.d";
import { NewsService } from "../../entities/news/news.service";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";
import { MdContentComponent } from "../../components/md-content/md-content.component";

interface NewsWithContent extends News {
	content?: string;
}

@Component({
	selector: "app-news",
	standalone: true,
	imports: [CommonModule, PageLoaderComponent, MdContentComponent],
	templateUrl: "./news.component.html",
	styleUrl: "./news.component.css",
})
export class NewsComponent {
	activatedRoute = inject(ActivatedRoute);
	NewsService = inject(NewsService);
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
		// Remove YAML front matter (--- ... ---)
		let cleaned = content.replace(/^---[\s\S]*?---\s*/, "");
		// Remove first H1 heading
		cleaned = cleaned.replace(/^#\s+.*?\n/, "").trim();
		return cleaned;
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			const lang = params["lang"] ?? "en";
			this.currentLang.set(lang);
			this.isLoading.set(true);
			this.NewsService.getAll().subscribe((response) => {
				const filtered = response.filter((a: News) => a.language === lang && !a.isHidden);
				const sorted = filtered.sort(
					(a: News, b: News) =>
						new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
				);

				const newsWithContent = sorted.map((newsItem) => ({
					...newsItem,
					content: "",
				}));

				this.allNews.set(newsWithContent);
				this.loadNewsContent(newsWithContent, lang);
			});
		});
	}

	private loadNewsContent(newsItems: NewsWithContent[], lang: string): void {
		let loadedCount = 0;
		const contentMap = new Map<string, string>();

		newsItems.forEach((newsItem, index) => {
			this.NewsService.get({
				lang,
				name: newsItem.dirname,
				filename: newsItem.filename,
			}).subscribe((content: string) => {
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
			});
		});
	}
}
