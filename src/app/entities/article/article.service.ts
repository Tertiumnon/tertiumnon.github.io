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
		const { lang, category, name, filename } = params;
		if (filename) {
			return this.httpClient.get(`assets/articles/${category}/${filename}`, {
				responseType: "text",
			});
		}
		return this.getAll().pipe(
			switchMap((articles) => {
				const article = articles.find(
					(a) => a.language === lang && a.link.includes(`/${category}/${name}`)
				);
				const file = article?.filename || `${name}.${lang}.md`;
				return this.httpClient.get(`assets/articles/${category}/${file}`, {
					responseType: "text",
				});
			})
		);
	}
}
