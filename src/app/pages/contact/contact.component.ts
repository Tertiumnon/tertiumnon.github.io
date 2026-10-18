import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Component } from "@angular/core";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrl: "./contact.component.css",
	standalone: true,
	imports: [PageHeaderComponent],
})
export class ContactComponent {}
