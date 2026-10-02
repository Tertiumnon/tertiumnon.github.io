import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import { News, NewsGetParams } from "./news.d";

@Injectable({
	providedIn: "root",
})
export class NewsService {
	private readonly httpClient = inject(HttpClient);

	getAll(): Observable<News[]> {
		return this.httpClient.get<News[]>("assets/news.json", {
			responseType: "json",
		}).pipe(
			catchError((error: unknown) =>
				throwError(() => new Error(`Failed to fetch news: ${error}`))
			)
		);
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
				).pipe(
					catchError((error: unknown) =>
						throwError(() => new Error(`Failed to fetch news content: ${error}`))
					)
				);
			}),
			catchError((error: unknown) =>
				throwError(() => new Error(`Failed to fetch news: ${error}`))
			)
		);
	}
}
