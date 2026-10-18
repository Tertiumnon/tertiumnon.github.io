import { Component, Input } from "@angular/core";

// The title row of a list page: the title on the left, the page's filters on the right.
@Component({
	selector: "app-page-header",
	standalone: true,
	templateUrl: "./page-header.component.html",
	styleUrl: "./page-header.component.css",
})
export class PageHeaderComponent {
	@Input({ required: true }) title = "";
}
