import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
	selector: "app-favorite",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./favorite.component.html",
	styleUrl: "./favorite.component.css",
})
export class FavoriteComponent {}
