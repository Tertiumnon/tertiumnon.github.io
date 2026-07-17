import { Component, Input, Output, EventEmitter, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-post-control-panel",
	templateUrl: "./post-control-panel.component.html",
	styleUrls: ["./post-control-panel.component.css"],
	standalone: true,
	imports: [CommonModule, DropdownComponent],
})
export class PostControlPanelComponent {
	@Input() categories: string[] = [];
	@Input() selectedCategory: string = "All";
	@Input() onCategoryChange: (category: string) => void = () => {};

	@Input() tags: string[] = [];
	@Input() selectedTag: string = "All";
	@Input() onTagChange: (tag: string) => void = () => {};

	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	currentLang = signal("en");

	constructor() {
		this.activatedRoute.params.subscribe((params) => {
			const lang = params["lang"] || "en";
			this.currentLang.set(lang);
		});
	}

	onLanguageChange(lang: string) {
		if (lang === this.currentLang()) return;

		const currentUrl = this.router.url;
		const currentLang = this.currentLang();

		let newUrl = currentUrl;
		if (currentUrl.includes(`/${currentLang}/`)) {
			newUrl = currentUrl.replace(`/${currentLang}/`, `/${lang}/`);
		} else if (currentUrl.startsWith(`/${currentLang}`)) {
			newUrl = currentUrl.replace(`/${currentLang}`, `/${lang}`);
		} else {
			newUrl = `/${lang}${currentUrl.startsWith("/") ? currentUrl : "/" + currentUrl}`;
		}

		this.router.navigateByUrl(newUrl);
	}
}
