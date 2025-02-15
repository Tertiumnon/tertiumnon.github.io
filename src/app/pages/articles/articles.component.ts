import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ContentComponent } from "../../components/content/content.component";
import { Article } from "../../entities/article/article";
import { ArticleService } from "../../entities/article/article.service";

@Component({
  selector: "app-articles",
  standalone: true,
  imports: [ContentComponent, RouterLink],
  templateUrl: "./articles.component.html",
  styleUrl: "./articles.component.less",
})
export class ArticlesComponent {
  articleService = inject(ArticleService);
  articleList = signal<Article[]>([]);
  
  ngOnInit() {
    this.articleService.getAll().subscribe((response) => {
      this.articleList.set(response);
    })
  }
}
