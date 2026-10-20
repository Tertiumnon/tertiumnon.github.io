import { Component } from "@angular/core";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

@Component({
	selector: "app-about-me",
	templateUrl: "./about-me.component.html",
	styleUrl: "./about-me.component.css",
	standalone: true,
	imports: [PageHeaderComponent],
})
export class AboutMeComponent {}
