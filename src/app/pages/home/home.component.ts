import { Component, HostListener, computed, inject, signal } from "@angular/core";
import { HelloWorldGameComponent } from "../../components/hello-world-game/hello-world-game.component";
import { HoneyCatchComponent } from "../../components/honey-catch/honey-catch.component";
import { GameStageComponent } from "../../components/game-stage/game-stage.component";
import { ArcadeCabinetComponent } from "../../components/arcade-cabinet/arcade-cabinet.component";
import { Theme } from "../../components/theme/theme.constants";
import { ThemeService } from "../../components/theme/theme.service";

type GameKey = "catch" | "hello";
type TvView = "menu" | "game";

const GAMES: { key: GameKey; label: string }[] = [
	{ key: "catch", label: "Honey Catch" },
	{ key: "hello", label: "Hello World" },
];

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
	standalone: true,
	imports: [HelloWorldGameComponent, HoneyCatchComponent, GameStageComponent, ArcadeCabinetComponent],
})
export class HomeComponent {
	private readonly themeService = inject(ThemeService);
	readonly games = GAMES;
	// The TV shows the game menu first; a game is created only when it is picked, so it starts right away.
	readonly view = signal<TvView>("menu");
	readonly game = signal<GameKey>("catch");
	// The Honey Pie theme's menu opens on Honey Catch; the other themes open on Hello World.
	readonly cursor = signal(this.themeService.theme() === Theme.HoneyPie ? 0 : 1);
	// The marquee names the selected game, in the menu and while it is played.
	readonly marqueeTitle = computed(() => GAMES[this.cursor()].label);

	moveCursor(step: number): void {
		this.cursor.update((index) => (index + step + GAMES.length) % GAMES.length);
	}

	startGame(index = this.cursor()): void {
		this.cursor.set(index);
		this.game.set(GAMES[index].key);
		this.view.set("game");
	}

	backToMenu(): void {
		this.view.set("menu");
	}

	// Menu: arrows choose, A or Enter starts. In a game: B (or Escape) goes back to the menu.
	@HostListener("document:keydown", ["$event"])
	onKeyDown(event: KeyboardEvent): void {
		if (this.view() === "game") {
			if (event.key === "Escape" || event.key.toLowerCase() === "b") this.backToMenu();
			return;
		}
		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			event.preventDefault();
			this.moveCursor(event.key === "ArrowUp" ? -1 : 1);
		} else if (event.key === "Enter" || event.key.toLowerCase() === "a") {
			this.startGame();
		}
	}
}
