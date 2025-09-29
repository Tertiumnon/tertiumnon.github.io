import { Component, OnInit } from "@angular/core";
import { EmulatorService } from "../../components/emulator/emulator.service";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	standalone: true,
})
export class ContactComponent {
	constructor(private emulatorService: EmulatorService) {}

	ngOnInit(): void {
		this.emulatorService.lines = [
			"First name: Vitalii",
			"Last name: Balabanov",
			"Medium: <a href='https://medium.com/@tertiumnon' class='text-link'>https://medium.com/@tertiumnon</a>",
			"LinkedIn: <a href='https://www.linkedin.com/in/tertium/' class='text-link'>https://www.linkedin.com/in/tertium/</a>",
			"Email: <a href='mailto:tertiumnon@gmail.com' class='text-link'>tertiumnon@gmail.com</a>",
		];
	}
}
