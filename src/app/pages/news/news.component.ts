import { Component, inject, signal, computed } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { News } from "../../entities/news/news.d";
import { NewsService } from "../../entities/news/news.service";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";
import { NewsControlPanelComponent } from "../../components/news-control-panel/news-control-panel.component";

@Component({
	selector: "app-news",
	standalone: true,
	imports: [CommonModule, PageLoaderComponent, NewsControlPanelComponent],
	templateUrl: "./news.component.html",
	styleUrl: "./news.component.css",
})
export class NewsComponent {
	activatedRoute = inject(ActivatedRoute);
	NewsService = inject(NewsService);
	allNews = signal<News[]>([]);
	isLoading = signal(true);
	selectedProject = signal("All");

	projects = computed(() => {
		const proj = new Set(this.allNews()
			.filter((a) => a.project)
			.map((a) => a.project as string));
		return ["All", ...Array.from(proj).sort()];
	});

	filteredNews = computed(() => {
		let filtered = this.allNews();

		if (this.selectedProject() !== "All") {
			filtered = filtered.filter((a) => a.project === this.selectedProject());
		}

		return filtered;
	});

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			const lang = params["lang"] ?? "en";
			this.isLoading.set(true);
			this.NewsService.getAll().subscribe((response) => {
				const filtered = response.filter((a: News) => a.language === lang && !a.isHidden);
				const sorted = filtered.sort(
					(a: News, b: News) =>
						new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
				);
				this.allNews.set(sorted);
				this.isLoading.set(false);
			});
		});
	}

	onProjectChange(project: string): void {
		this.selectedProject.set(project);
	}
}
