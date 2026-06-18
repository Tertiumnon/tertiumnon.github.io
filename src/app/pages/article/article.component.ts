import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MdContentComponent } from "../../components/md-content/md-content.component";
import { Article, ArticleGetParams } from "../../entities/article/article";
import { ArticleService } from "../../entities/article/article.service";

@Component({
	selector: "app-article",
	standalone: true,
	imports: [MdContentComponent],
	templateUrl: "./article.component.html",
	styleUrl: "./article.component.css",
})
export class ArticleComponent {
	activatedRoute = inject(ActivatedRoute);
	articleService = inject(ArticleService);
	data = signal("");
	category = signal("");
	articleName = signal("");
	articleDirname = signal("");
	articleDate = signal("");

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			this.category.set(params["category"]);
			this.articleName.set(params["name"]);

			// Get article details to extract dirname and date
			this.articleService.getAll().subscribe((articles) => {
				const article = articles.find(
					(a: Article) => a.link.includes(`/${params["category"]}/${params["name"]}`)
				);
				if (article) {
					this.articleDirname.set(article.dirname);
					this.articleDate.set(article.publishedAt);
				}
			});

			this.articleService
				.get(params as ArticleGetParams)
				.subscribe((response: string) => {
					this.data.set(response);
				});
		});
	}
}
