import { Component } from "@angular/core";
import { HelloWorldGameComponent } from "../../components/hello-world-game/hello-world-game.component";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	standalone: true,
	imports: [HelloWorldGameComponent],
})
export class HomeComponent { }
