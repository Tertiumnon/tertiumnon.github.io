import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
	private readonly destroyRef = inject(DestroyRef);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly postService = inject(PostService);
	private readonly router = inject(Router);

	data = signal("");
	category = signal("");
	postName = signal("");
	postDirname = signal("");
	postDate = signal("");
	currentLang = signal("en");
	isLoading = signal(true);

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((params) => {
				this.isLoading.set(true);
				this.postName.set(params["name"]);
				const lang = params["lang"] ?? "en";
				this.currentLang.set(lang);

				this.postService.getAll().subscribe({
					next: (posts) => {
						const post = posts.find(
							(a: Post) => a.dirname === params["name"] && a.language === lang
						);

						if (post) {
							this.category.set(post.category);
							this.postDirname.set(post.dirname);
							this.postDate.set(post.publishedAt);

							this.postService
								.get({
									lang,
									category: post.category,
									name: post.dirname,
								} as PostGetParams)
								.subscribe({
									next: (response: string) => {
										this.data.set(response);
										this.isLoading.set(false);
									},
									error: (error: unknown) => {
										console.error(`Failed to load post ${params["name"]}:`, error);
										this.isLoading.set(false);
									},
								});
						} else {
							this.router.navigate([`/${lang}/posts/404`], {
								queryParams: { search: params["name"] }
							});
						}
					},
					error: (error: unknown) => {
						console.error("Failed to fetch posts:", error);
						this.isLoading.set(false);
					},
				});
			});
	}

	getCurrentLang(): string {
		return this.currentLang();
	}
}
