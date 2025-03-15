import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Article, ArticleGetParams } from "./article";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Article[]>("assets/articles.json", { responseType: "json" });
  }

  get(params: ArticleGetParams) {
    const { category, name } = params;
    return this.httpClient.get(`assets/articles/${category}/${name}.md`, { responseType: "text" });
  }
}
