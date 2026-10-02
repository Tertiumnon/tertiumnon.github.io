import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Post, PostGetParams } from "./post";

@Injectable({
	providedIn: "root",
})
export class PostService {
	private readonly httpClient = inject(HttpClient);

	getAll(): Observable<Post[]> {
		return this.httpClient.get<Post[]>("assets/posts.json", {
			responseType: "json",
		}).pipe(
			catchError((error: unknown) =>
				throwError(() => new Error(`Failed to fetch posts: ${error}`))
			)
		);
	}

	get(params: PostGetParams): Observable<string> {
		const { lang, category, name } = params;
		return this.getAll().pipe(
			switchMap((posts: Post[]) => {
				const post = posts.find(
					(a: Post) => a.language === lang && a.link.includes(`/${name}`)
				);
				const dirname = post?.dirname || name;
				const filename = post?.filename || `index.${lang}.md`;
				return this.httpClient.get(
					`assets/posts/${dirname}/${filename}`,
					{ responseType: "text" }
				).pipe(
					catchError((error: unknown) =>
						throwError(() => new Error(`Failed to fetch post content: ${error}`))
					)
				);
			}),
			catchError((error: unknown) =>
				throwError(() => new Error(`Failed to fetch posts: ${error}`))
			)
		);
	}
}
