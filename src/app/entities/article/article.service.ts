import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { switchMap } from "rxjs";
import { Article, ArticleGetParams } from "./article";

@Injectable({
	providedIn: "root",
})
export class ArticleService {
	httpClient = inject(HttpClient);

	getAll() {
		return this.httpClient.get<Article[]>("assets/articles.json", {
			responseType: "json",
		});
	}

	get(params: ArticleGetParams) {
		const { lang, category, name } = params;
		return this.getAll().pipe(
			switchMap((articles) => {
				const article = articles.find(
					(a) => a.language === lang && a.link.includes(`/${category}/${name}`)
				);
				const dirname = article?.dirname || name;
				const filename = article?.filename || `article.${lang}.md`;
				return this.httpClient.get(
					`assets/articles/${category}/${dirname}/${filename}`,
					{ responseType: "text" }
				);
			})
		);
	}
}
