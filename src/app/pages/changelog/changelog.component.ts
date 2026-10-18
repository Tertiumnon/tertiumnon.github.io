import { Component, DestroyRef, inject, signal, computed } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Changelog } from "../../entities/changelog/changelog.types";
import { ChangelogService } from "../../entities/changelog/changelog.service";
import { MdContentComponent } from "../../components/md-content/md-content.component";
import { ChangelogFilterService } from "../../components/sidebar/changelog-filter.service";

@Component({
	selector: "app-changelog",
	standalone: true,
	imports: [CommonModule, MdContentComponent],
	templateUrl: "./changelog.component.html",
	styleUrl: "./changelog.component.css",
})
export class ChangelogComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly changelogService = inject(ChangelogService);
	readonly filters = inject(ChangelogFilterService);

	// Entries arrive with their Markdown already built in, so the page needs a single request.
	allChangelog = signal<Changelog[]>([]);
	currentLang = signal("en");

	filteredChangelog = computed(() => {
		const project = this.filters.selectedProject();
		return this.allChangelog()
			.filter((changelogItem) => project === "All" || changelogItem.project === project)
			.map((changelogItem) => ({
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

				this.changelogService.getAll().subscribe({
					next: (response) => {
						const sorted = response
							.filter((a: Changelog) => a.language === lang && !a.isHidden)
							.sort(
								(a: Changelog, b: Changelog) =>
									new Date(b.publishedAt).getTime() -
									new Date(a.publishedAt).getTime()
							);

						const projects = Array.from(
							new Set(sorted.map((item) => item.project).filter((project): project is string => !!project))
						).sort();
						this.filters.projects.set(["All", ...projects]);
						this.allChangelog.set(sorted);
					},
					error: (error: unknown) => {
						console.error("Failed to load changelog:", error);
					},
				});
			});
	}
}
