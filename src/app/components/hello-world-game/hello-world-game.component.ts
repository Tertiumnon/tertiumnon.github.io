import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-hello-world-game",
	templateUrl: "./hello-world-game.component.html",
	styleUrls: ["./hello-world-game.component.css"],
	standalone: true,
	imports: [CommonModule],
})
export class HelloWorldGameComponent {
	name = "";
	score = 0;
	target = 5;

	increment() {
		this.score++;
	}

	reset() {
		this.score = 0;
	}

	get won() {
		return this.score >= this.target;
	}
}
