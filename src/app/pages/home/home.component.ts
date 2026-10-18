import { Component, HostListener, inject, signal } from "@angular/core";
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
	// A game is created only after its start screen is passed, so it begins when the player presses A.
	readonly started = signal(false);
	readonly games: { key: GameKey; label: string }[] = [
		{ key: "catch", label: "Honey Catch" },
		{ key: "hello", label: "Hello World" },
	];

	select(key: GameKey): void {
		this.game.set(key);
		this.started.set(false);
	}

	pressStart(): void {
		this.started.set(true);
	}

	@HostListener("document:keydown", ["$event"])
	onKeyDown(event: KeyboardEvent): void {
		if (!this.started() && event.key.toLowerCase() === "a") this.pressStart();
	}
}
