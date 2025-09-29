import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-favorite-books",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./favorite-books.component.html",
	styleUrl: "./favorite-books.component.less",
})
export class FavoriteBooksComponent {}
