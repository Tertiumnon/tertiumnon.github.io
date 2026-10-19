import { Component, DestroyRef, HostListener, computed, inject, signal } from "@angular/core";
import { MatrixRainComponent } from "../../components/matrix-rain/matrix-rain.component";
import { Router } from "@angular/router";
import { HelloWorldGameComponent } from "../../components/hello-world-game/hello-world-game.component";
import { HoneyCatchComponent } from "../../components/honey-catch/honey-catch.component";
import { GameStageComponent } from "../../components/game-stage/game-stage.component";
import { ArcadeCabinetComponent } from "../../components/arcade-cabinet/arcade-cabinet.component";
import { Theme } from "../../components/theme/theme.constants";
import { ThemeService } from "../../components/theme/theme.service";
import { SoundService } from "../../components/sound/sound.service";

type GameKey = "catch" | "hello";
// main: the start menu; games: the game menu under "Just want to play a game"; game: a game is running.
type TvView = "main" | "games" | "game";

interface MenuItem {
	label: string;
	description?: string;
	// Route of the page the item opens; the games item has none and opens the game menu instead.
	route?: string;
}

const MAIN_ITEMS: MenuItem[] = [
	{ label: "Projects", route: "projects", description: "My software projects (cli utils, apps, app extensions, libs, conventions, docs, etc)" },
	{ label: "Lines", route: "lines", description: "Short message from my social networks." },
	{ label: "Posts", route: "posts", description: "Articles and notes on what I build." },
	{ label: "Tools", route: "tools", description: "Small web tools." },
	{ label: "About me", route: "about-me", description: "Who makes these projects." },
	{ label: "Play a game", description: "Honey Catch and Hellowordian, for a short break." },
];

const IDLE_MS = 30_000;

const GAMES: (MenuItem & { key: GameKey })[] = [
	{ key: "catch", label: "Honey Catch" },
	{ key: "hello", label: "Hellowordian" },
];

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
	standalone: true,
	imports: [HelloWorldGameComponent, HoneyCatchComponent, GameStageComponent, ArcadeCabinetComponent, MatrixRainComponent],
})
export class HomeComponent {
	private readonly themeService = inject(ThemeService);
	private readonly router = inject(Router);
	private readonly sound = inject(SoundService);
	readonly view = signal<TvView>("main");
	readonly mainCursor = signal(0);
	readonly game = signal<GameKey>("catch");
	// The Honey Pie theme's game menu opens on Honey Catch; the other themes open on Hello World.
	readonly gameCursor = signal(this.defaultGameCursor());
	// False while the set is switched off: key presses are ignored, so nothing starts behind the dark screen.
	readonly tvOn = signal(true);

	// After this long without input, the menus give way to the Matrix rain.
	readonly idle = signal(false);
	private lastActivity = Date.now();

	// The menu on the TV: the start menu, or the games.
	readonly menu = computed<MenuItem[]>(() => (this.view() === "main" ? MAIN_ITEMS : GAMES));
	readonly menuCursor = computed(() => (this.view() === "main" ? this.mainCursor() : this.gameCursor()));
	readonly menuTitle = computed(() => (this.view() === "main" ? "Main menu" : "Select game"));
	readonly description = computed(() => (this.view() === "main" ? MAIN_ITEMS[this.mainCursor()].description : undefined));

	constructor() {
		const timer = setInterval(() => this.idle.set(this.view() !== "game" && this.tvOn() && Date.now() - this.lastActivity > IDLE_MS), 1000);
		inject(DestroyRef).onDestroy(() => clearInterval(timer));
	}

	moveCursor(step: number): void {
		const size = this.menu().length;
		const next = (this.menuCursor() + step + size) % size;
		if (this.view() === "main") this.mainCursor.set(next);
		else this.gameCursor.set(next);
		this.sound.play("move");
	}

	choose(index: number): void {
		if (this.view() === "main") this.chooseMain(index);
		else this.startGame(index);
	}

	chooseMain(index: number): void {
		this.sound.play("select");
		this.mainCursor.set(index);
		const item = MAIN_ITEMS[index];
		if (item.route) void this.router.navigateByUrl(`/${item.route}`);
		else this.view.set("games");
	}

	startGame(index = this.gameCursor()): void {
		this.sound.play("select");
		this.gameCursor.set(index);
		this.game.set(GAMES[index].key);
		this.view.set("game");
	}

	// Any key or pointer movement wakes the TV from the Matrix rain.
	@HostListener("document:pointermove")
	@HostListener("document:pointerdown")
	markActive(): void {
		this.lastActivity = Date.now();
		this.idle.set(false);
	}

	private defaultGameCursor(): number {
		return this.themeService.theme() === Theme.HoneyPie ? 0 : 1;
	}

	// Switching the set on or off starts again from the main menu, with any game stopped.
	onPowerChange(on: boolean): void {
		this.tvOn.set(on);
		this.view.set("main");
		this.mainCursor.set(0);
		this.game.set("catch");
		this.gameCursor.set(this.defaultGameCursor());
	}

	back(): void {
		this.sound.play("back");
		this.view.set(this.view() === "game" ? "games" : "main");
	}

	// Menus: arrows choose, A or Enter selects. Games and the game screen: B or Escape goes back.
	@HostListener("document:keydown", ["$event"])
	onKeyDown(event: KeyboardEvent): void {
		this.markActive();
		if (!this.tvOn()) return;
		const isBack = event.key === "Escape" || event.key.toLowerCase() === "b";
		if (this.view() === "game") {
			if (isBack) this.back();
			return;
		}
		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			event.preventDefault();
			this.moveCursor(event.key === "ArrowUp" ? -1 : 1);
		} else if (event.key === "Enter" || event.key.toLowerCase() === "a") {
			// Enter on a focused menu button would also click it, choosing the item twice.
			event.preventDefault();
			this.choose(this.menuCursor());
		} else if (isBack && this.view() === "games") {
			this.back();
		}
	}
}
