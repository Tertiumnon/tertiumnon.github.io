import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Component } from "@angular/core";

@Component({
	selector: "app-about-me",
	templateUrl: "./about-me.component.html",
	styleUrl: "./about-me.component.css",
	standalone: true,
	imports: [PageHeaderComponent],
})
export class AboutMeComponent {}
