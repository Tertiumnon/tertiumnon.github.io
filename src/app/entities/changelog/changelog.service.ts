import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Changelog, ChangelogGetParams } from "./changelog.types";

@Injectable({
	providedIn: "root",
})
export class ChangelogService {
	private readonly httpClient = inject(HttpClient);

	getAll(): Observable<Changelog[]> {
		return this.httpClient.get<Changelog[]>("assets/changelog.json", {
			responseType: "json",
		}).pipe(
			catchError((error: unknown) =>
				throwError(() => new Error(`Failed to fetch changelog: ${error}`))
			)
		);
	}

	get(params: ChangelogGetParams): Observable<string> {
		const { lang, name } = params;
		return this.getAll().pipe(
			switchMap((changelog: Changelog[]) => {
				const changelogItem = changelog.find(
					(a: Changelog) => a.language === lang && a.link.includes(`/${name}`)
				);
				const dirname = changelogItem?.dirname || name;
				const filename = changelogItem?.filename || `index.${lang}.md`;
				return this.httpClient.get(
					`assets/changelog/${dirname}/${filename}`,
					{ responseType: "text" }
				).pipe(
					catchError((error: unknown) =>
						throwError(() => new Error(`Failed to fetch changelog content: ${error}`))
					)
				);
			}),
			catchError((error: unknown) =>
				throwError(() => new Error(`Failed to fetch changelog: ${error}`))
			)
		);
	}
}
