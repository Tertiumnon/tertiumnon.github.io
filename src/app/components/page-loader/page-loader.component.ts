import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-page-loader",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./page-loader.component.html",
	styleUrl: "./page-loader.component.css",
})
export class PageLoaderComponent {
	@Input() isLoading = false;
}
