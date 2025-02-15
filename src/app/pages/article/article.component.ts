import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MdContentComponent } from "../../components/md-content/md-content.component";
import { ArticleGetParams } from "../../entities/article/article";
import { ArticleService } from "../../entities/article/article.service";
import { ContentComponent } from "../../components/content/content.component";

@Component({
  selector: "app-article",
  standalone: true,
  imports: [ContentComponent, MdContentComponent],
  templateUrl: "./article.component.html",
  styleUrl: "./article.component.less",
})
export class ArticleComponent {
  activatedRoute = inject(ActivatedRoute);
  articleService = inject(ArticleService);
  data = signal("");

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.articleService.get(params as ArticleGetParams).subscribe((response) => {
        this.data.set(response);
      });
    });
  }
}
