import { Component, inject } from "@angular/core";
import { HelloWorldGameComponent } from "../../components/hello-world-game/hello-world-game.component";
import { HoneyCatchComponent } from "../../components/honey-catch/honey-catch.component";
import { Theme } from "../../components/theme/theme.constants";
import { ThemeService } from "../../components/theme/theme.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	standalone: true,
	imports: [HelloWorldGameComponent, HoneyCatchComponent],
})
export class HomeComponent {
	readonly themeService = inject(ThemeService);
	readonly honeyPie = Theme.HoneyPie;
}
