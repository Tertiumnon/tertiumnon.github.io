import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { News, NewsGetParams } from "./news.d";

@Injectable({
	providedIn: "root",
})
export class NewsService {
	httpClient = inject(HttpClient);

	getAll() {
		return this.httpClient.get<News[]>("assets/news.json", {
			responseType: "json",
		});
	}

	get(params: NewsGetParams): Observable<string> {
		const { lang, name } = params;
		return this.getAll().pipe(
			switchMap((news: News[]) => {
				const newsItem = news.find(
					(a: News) => a.language === lang && a.link.includes(`/${name}`)
				);
				const dirname = newsItem?.dirname || name;
				const filename = newsItem?.filename || `index.${lang}.md`;
				return this.httpClient.get(
					`assets/news/${dirname}/${filename}`,
					{ responseType: "text" }
				);
			})
		);
	}
}
