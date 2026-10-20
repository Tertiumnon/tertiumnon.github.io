import {
	Component,
	computed,
	type ElementRef,
	inject,
	type OnDestroy,
	type OnInit,
	signal,
	viewChild,
} from "@angular/core";
import { GameOverComponent } from "../game-over/game-over.component";
import { SoundService } from "../sound/sound.service";

interface Pie {
	id: number;
	x: number;
	y: number;
	// Hearts are bonus drops: worth more when caught and gone when they reach the ground.
	heart?: boolean;
}

const BEST_KEY = "honey-catch-best";
const TICK_MS = 40;
const LIVES = 3;
const PYRAMID_ROWS = 5;
// Positions are percentages of the field. The collider follows the girl picture: a pie is caught when it reaches
// the top of the picture and is within the figure's width (sizes are fractions of the field width).
const GIRL_WIDTH = 0.28;
const GIRL_RATIO = 113 / 200;
const PIE_WIDTH = 0.06;
const CATCH_RANGE = 10;
const STEP = 1.6;
const SPAWN_EVERY_TICKS = 32;
// One heart every 30 seconds of play.
const HEART_INTERVAL_MS = 30000;

// Catch the honey pies with the girl from the picture. Move with the left and right arrow keys.
@Component({
	selector: "app-honey-catch",
	standalone: true,
	imports: [GameOverComponent],
	template: `
		<section class="honey-catch">
			<header class="hud">
				<span>Score <b>{{ score() }}</b></span>
				<span class="lives" aria-label="Lives">{{ hearts() }}</span>
			</header>
			<div #field class="field">
				@for (pie of pies(); track pie.id) {
				<span class="pie" [class.heart]="pie.heart" [style.left.%]="pie.x" [style.top.%]="pie.y">{{ pie.heart ? "♥" : "" }}</span>
				}
				<img class="girl" [class.lying]="over()" src="/assets/games/honey-pie-girl.gif" alt="" [style.left.%]="girlX()" />
				@for (pie of finale(); track pie.id; let i = $index) {
				<span class="pie drop" [style.left.%]="pie.x" [style.top.%]="pie.y" [style.--delay]="(i * 90) + 'ms'"></span>
				}
				@if (over()) {
				<app-game-over [score]="score()" [light]="true"></app-game-over>
				}
			</div>
		</section>
	`,
	styles: [
		`
		:host {
			display: block;
			height: 100%;
		}

		.honey-catch {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			font-family: "VT323", monospace;
			font-size: 2rem;
		}

		.hud {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 12px 18px;
			padding: 10px 26px 0;
			margin-bottom: 8px;
			font-size: 1.7rem;
		}

		.hud b {
			font-weight: 600;
		}

		.hud button {
			margin-left: auto;
			padding: 2px 12px;
			border: 1px solid var(--theme-border);
			border-radius: 0;
			background-color: var(--theme-surface);
			color: inherit;
			font: inherit;
			cursor: pointer;
		}

		.field {
			position: relative;
			width: 100%;
			flex: 1;
			min-height: 0;
			overflow: hidden;
			touch-action: none;
			border: 1px solid var(--theme-border);
			border-top: 2px solid var(--theme-accent);
			border-radius: var(--editor-radius);
			background-color: var(--theme-panel);
		}

		/* Each tick moves the sprites a little; the transition glides them there instead of jumping. */
		.pie,
		.girl {
			transition: left 40ms linear, top 40ms linear;
		}

		.pie {
			position: absolute;
			width: 6%;
			aspect-ratio: 1;
			border-radius: 50%;
			transform: translateX(-50%);
			background: radial-gradient(circle at 35% 35%, #fff3b0, #ffb703 45%, #c77d1a 100%);
			box-shadow: 0 0 8px rgba(255, 183, 3, 0.6);
		}

		/* Sizes are percentages of the field, so the girl and the pies scale with the screen. */
			.pie.drop {
			animation: drop 0.5s ease-in both;
			animation-delay: var(--delay);
		}

		@keyframes drop {
			from { transform: translate(-50%, -70vh); }
			to { transform: translate(-50%, 0); }
		}

		.lives {
			color: #ff2e9a;
		}

		.pie.heart {
			background: none;
			box-shadow: none;
			color: #ff2e9a;
			display: grid;
			place-items: center;
			font-size: 4.5rem;
			text-shadow: 0 0 10px #ff2e9a;
		}

		/* Game over: the girl lies on the ground under the pile. */
		.girl.lying {
			transform: translate(-50%, -39%) rotate(-90deg);
		}

		.girl {
			position: absolute;
			bottom: 0;
			width: 28%;
			transform: translateX(-50%);
			pointer-events: none;
		}

		.message {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			margin: 0;
			font-size: 2rem;
			background-color: color-mix(in srgb, var(--theme-bg) 60%, transparent);
		}
	`,
	],
	host: {
		"(document:keydown)": "onKeyDown($event)",
		"(document:keyup)": "onKeyUp($event)",
	},
})
export class HoneyCatchComponent implements OnInit, OnDestroy {
	readonly pies = signal<Pie[]>([]);
	readonly girlX = signal(50);
	readonly score = signal(0);
	readonly lives = signal(LIVES);
	readonly finale = signal<Pie[]>([]);
	readonly hearts = computed(() => "♥".repeat(this.lives()));
	readonly running = signal(false);
	readonly over = signal(false);
	private readonly sound = inject(SoundService);
	readonly best = signal(this.loadBest());

	private timer: ReturnType<typeof setInterval> | undefined;
	private ticks = 0;
	private nextSpawnTick = SPAWN_EVERY_TICKS;
	private nextHeartMs = HEART_INTERVAL_MS;
	private nextId = 0;
	private readonly keys = new Set<string>();
	private readonly field = viewChild.required<ElementRef<HTMLElement>>("field");

	// The game starts as soon as it is shown; the home page shows it after the start screen.
	ngOnInit(): void {
		this.start();
	}

	start(): void {
		this.stop();
		this.pies.set([]);
		this.girlX.set(50);
		this.score.set(0);
		this.finale.set([]);
		this.lives.set(LIVES);
		this.ticks = 0;
		this.nextSpawnTick = SPAWN_EVERY_TICKS;
		this.nextHeartMs = HEART_INTERVAL_MS;
		this.over.set(false);
		this.running.set(true);
		this.timer = setInterval(() => this.tick(), TICK_MS);
	}

	onKeyDown(event: KeyboardEvent): void {
		if (this.over()) {
			if (event.key.toLowerCase() === "a" || event.key === "Enter")
				this.start();
			return;
		}
		if (!this.running() || !["ArrowLeft", "ArrowRight"].includes(event.key))
			return;
		event.preventDefault();
		this.keys.add(event.key);
	}

	onKeyUp(event: KeyboardEvent): void {
		this.keys.delete(event.key);
	}

	ngOnDestroy(): void {
		this.stop();
	}

	private tick(): void {
		let x = this.girlX();
		if (this.keys.has("ArrowLeft")) x -= STEP;
		if (this.keys.has("ArrowRight")) x += STEP;
		x = this.clamp(x);
		this.girlX.set(x);

		const field = this.field().nativeElement;
		const girlTop =
			100 -
			((field.clientWidth * GIRL_WIDTH * GIRL_RATIO) / field.clientHeight) *
				100;
		const pieSize =
			((field.clientWidth * PIE_WIDTH) / field.clientHeight) * 100;
		const fall = Math.min(0.8 + this.score() * 0.04, 2.2);
		const kept: Pie[] = [];
		let caught = 0;
		let missed = 0;
		let restored = 0;
		for (const pie of this.pies()) {
			const y = pie.y + fall;
			if (y + pieSize >= girlTop && Math.abs(pie.x - x) <= CATCH_RANGE) {
				if (pie.heart) restored++;
				else caught++;
			} else if (y + pieSize >= 100) {
				// A pie that reaches the ground is lost; a heart that reaches the ground is just gone.
				if (!pie.heart) missed++;
			} else {
				kept.push({ ...pie, y });
			}
		}

		this.ticks++;
		const elapsedMs = this.ticks * TICK_MS;
		if (this.ticks >= this.nextSpawnTick) {
			const heart = elapsedMs >= this.nextHeartMs;
			if (heart) this.nextHeartMs += HEART_INTERVAL_MS;
			kept.push({ id: this.nextId++, x: 8 + Math.random() * 84, y: 0, heart });
			// Pies come a little more often as the game goes on.
			this.nextSpawnTick =
				this.ticks +
				Math.max(18, Math.round(SPAWN_EVERY_TICKS - elapsedMs / 10000));
		}
		this.pies.set(kept);

		if (caught) this.score.update((score) => score + caught);
		if (restored)
			this.lives.update((lives) => Math.min(LIVES, lives + restored));
		if (missed) this.lives.update((lives) => Math.max(0, lives - missed));
		if (caught) this.sound.play("catch");
		if (restored) this.sound.play("heart");
		if (missed) this.sound.play("miss");
		if (this.lives() === 0) this.end();
	}

	private end(): void {
		this.sound.play("over");
		this.stop();
		this.over.set(true);
		this.running.set(false);
		this.pies.set([]);
		this.finale.set(this.buildFinale());
		if (this.score() > this.best()) {
			this.best.set(this.score());
			this.saveBest(this.best());
		}
	}

	// Game over: a pyramid of pies drops onto the lying girl, widest row at the bottom.
	private buildFinale(): Pie[] {
		const field = this.field().nativeElement;
		const pieSize =
			((field.clientWidth * PIE_WIDTH) / field.clientHeight) * 100;
		// Lying down, the figure is about half the picture's width tall; the pyramid stands on her.
		const base =
			100 - ((field.clientWidth * GIRL_WIDTH * 0.5) / field.clientHeight) * 100;
		const x = this.girlX();
		const pies: Pie[] = [];
		for (let row = 0; row < PYRAMID_ROWS; row++) {
			const count = PYRAMID_ROWS - row;
			for (let j = 0; j < count; j++) {
				pies.push({
					id: pies.length,
					x: x + (j - (count - 1) / 2) * PIE_WIDTH * 100 * 0.95,
					y: base - pieSize * (row + 1),
				});
			}
		}
		return pies;
	}

	private stop(): void {
		clearInterval(this.timer);
		this.timer = undefined;
		this.keys.clear();
	}

	private clamp(x: number): number {
		return Math.min(92, Math.max(8, x));
	}

	private loadBest(): number {
		try {
			return Number(localStorage.getItem(BEST_KEY)) || 0;
		} catch {
			return 0;
		}
	}

	private saveBest(best: number): void {
		try {
			localStorage.setItem(BEST_KEY, String(best));
		} catch {
			// Storage access denied or unavailable
		}
	}
}
