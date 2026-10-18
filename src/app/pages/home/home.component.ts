import { Component, inject, signal } from "@angular/core";
import { HelloWorldGameComponent } from "../../components/hello-world-game/hello-world-game.component";
import { HoneyCatchComponent } from "../../components/honey-catch/honey-catch.component";
import { GameStageComponent } from "../../components/game-stage/game-stage.component";
import { ArcadeCabinetComponent } from "../../components/arcade-cabinet/arcade-cabinet.component";
import { Theme } from "../../components/theme/theme.constants";
import { ThemeService } from "../../components/theme/theme.service";

type GameKey = "catch" | "hello";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
	standalone: true,
	imports: [HelloWorldGameComponent, HoneyCatchComponent, GameStageComponent, ArcadeCabinetComponent],
})
export class HomeComponent {
	private readonly themeService = inject(ThemeService);
	// The Honey Pie theme opens with the honey catch game; the other themes open the hello world game.
	readonly game = signal<GameKey>(this.themeService.theme() === Theme.HoneyPie ? "catch" : "hello");
	readonly games: { key: GameKey; label: string }[] = [
		{ key: "catch", label: "Honey Catch" },
		{ key: "hello", label: "Hello World" },
	];
}
