import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Post, PostGetParams } from "./post";

@Injectable({
	providedIn: "root",
})
export class PostService {
	httpClient = inject(HttpClient);

	getAll() {
		return this.httpClient.get<Post[]>("assets/posts.json", {
			responseType: "json",
		});
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
				);
			})
		);
	}
}
