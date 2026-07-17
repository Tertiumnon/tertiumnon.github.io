import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MdContentComponent } from "../../components/md-content/md-content.component";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";
import { Post, PostGetParams } from "../../entities/post/post";
import { PostService } from "../../entities/post/post.service";

@Component({
	selector: "app-post",
	standalone: true,
	imports: [CommonModule, MdContentComponent, PageLoaderComponent],
	templateUrl: "./post.component.html",
	styleUrl: "./post.component.css",
})
export class PostComponent {
	activatedRoute = inject(ActivatedRoute);
	PostService = inject(PostService);
	router = inject(Router);
	data = signal("");
	category = signal("");
	postName = signal("");
	postDirname = signal("");
	postDate = signal("");
	currentLang = signal("en");
	isLoading = signal(true);

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			this.isLoading.set(true);
			this.postName.set(params["name"]);
			const lang = params["lang"] ?? "en";
			this.currentLang.set(lang);

			// Get post details to extract dirname, category and date
			this.PostService.getAll().subscribe((posts) => {
				const post = posts.find(
					(a: Post) => a.dirname === params["name"] && a.language === lang
				);
				if (post) {
					this.category.set(post.category);
					this.postDirname.set(post.dirname);
					this.postDate.set(post.publishedAt);

					// Load post content
					this.PostService
						.get({
							lang,
							category: post.category,
							name: post.dirname,
						})
						.subscribe((response: string) => {
							this.data.set(response);
							this.isLoading.set(false);
						});
				} else {
					// Post not found, redirect to 404 page with the attempted post name
					this.router.navigate([`/${lang}/posts/404`], {
						queryParams: { search: params["name"] }
					});
				}
			});
		});
	}

	getCurrentLang(): string {
		return this.currentLang();
	}
}
