import { Component, DestroyRef, inject, signal, computed } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Changelog } from "../../entities/changelog/changelog.types";
import { ChangelogService } from "../../entities/changelog/changelog.service";
import { PageLoaderComponent } from "../../components/page-loader/page-loader.component";
import { MdContentComponent } from "../../components/md-content/md-content.component";

interface ChangelogWithContent extends Changelog {
	content?: string;
	dirname: string;
	filename: string;
}

@Component({
	selector: "app-changelog",
	standalone: true,
	imports: [CommonModule, PageLoaderComponent, MdContentComponent],
	templateUrl: "./changelog.component.html",
	styleUrl: "./changelog.component.css",
})
export class ChangelogComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly changelogService = inject(ChangelogService);

	allChangelog = signal<ChangelogWithContent[]>([]);
	isLoading = signal(true);
	currentLang = signal("en");

	filteredChangelog = computed(() => {
		return this.allChangelog().map((changelogItem) => ({
			...changelogItem,
			content: this.stripFirstHeading(changelogItem.content || ""),
		}));
	});

	private stripFirstHeading(content: string): string {
		let cleaned = content.replace(/^---[\s\S]*?---\s*/, "");
		cleaned = cleaned.replace(/^#\s+.*?\n/, "").trim();
		return cleaned;
	}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((params) => {
				const lang = params["lang"] ?? "en";
				this.currentLang.set(lang);
				this.isLoading.set(true);

				this.changelogService.getAll().subscribe({
					next: (response) => {
						const filtered = response.filter(
							(a: Changelog) => a.language === lang && !a.isHidden
						);
						const sorted = filtered.sort(
							(a: Changelog, b: Changelog) =>
								new Date(b.publishedAt).getTime() -
								new Date(a.publishedAt).getTime()
						);

						const changelogWithContent = sorted.map((changelogItem) => ({
							...changelogItem,
							content: "",
						}));

						this.allChangelog.set(changelogWithContent);
						this.loadChangelogContent(changelogWithContent, lang);
					},
					error: (error: unknown) => {
						console.error("Failed to load changelog:", error);
						this.isLoading.set(false);
					},
				});
			});
	}

	private loadChangelogContent(
		changelogItems: ChangelogWithContent[],
		lang: string
	): void {
		let loadedCount = 0;
		const contentMap = new Map<string, string>();

		changelogItems.forEach((changelogItem) => {
			this.changelogService
				.get({
					lang,
					name: changelogItem.dirname,
					filename: changelogItem.filename,
				})
				.subscribe({
					next: (content: string) => {
						contentMap.set(changelogItem.dirname, content);
						loadedCount++;

						if (loadedCount === changelogItems.length) {
							const updatedChangelog = changelogItems.map((item) => ({
								...item,
								content: contentMap.get(item.dirname) || "",
							}));
							this.allChangelog.set(updatedChangelog);
							this.isLoading.set(false);
						}
					},
					error: (error: unknown) => {
						console.error(
							`Failed to load content for ${changelogItem.dirname}:`,
							error
						);
					},
				});
		});
	}
}
