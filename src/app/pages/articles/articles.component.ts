import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Article } from "../../entities/article/article";
import { ArticleService } from "../../entities/article/article.service";

@Component({
	selector: "app-articles",
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: "./articles.component.html",
	styleUrl: "./articles.component.css",
})
export class ArticlesComponent {
	activatedRoute = inject(ActivatedRoute);
	articleService = inject(ArticleService);
	articleList = signal<Article[]>([]);

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			const lang = params["lang"] ?? "en";
			this.articleService.getAll().subscribe((response) => {
				this.articleList.set(response.filter((a) => a.language === lang));
			});
		});
	}
}
