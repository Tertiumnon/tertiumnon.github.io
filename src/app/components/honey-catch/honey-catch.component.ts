import { Component, ElementRef, OnDestroy, OnInit, signal, viewChild } from "@angular/core";

interface Pie {
	id: number;
	x: number;
	y: number;
}

const BEST_KEY = "honey-catch-best";
const TICK_MS = 40;
// Game over when a pile of landed pies reaches this height (top of the pile, in % of the field).
const PILE_LIMIT = 50;
// Positions are percentages of the field. The collider follows the girl picture: a pie is caught when it reaches
// the top of the picture and is within the figure's width (sizes are fractions of the field width).
const GIRL_WIDTH = 0.28;
const GIRL_RATIO = 113 / 200;
const PIE_WIDTH = 0.08;
const CATCH_RANGE = 10;
const STEP = 1.6;
const SPAWN_EVERY_TICKS = 32;

// Catch the honey pies with the girl from the picture. Move with the pointer or the arrow keys.
@Component({
	selector: "app-honey-catch",
	standalone: true,
	template: `
		<section class="honey-catch">
			<header class="hud">
				<span>Score <b>{{ score() }}</b></span>
			</header>
			<div #field class="field" (pointermove)="onPointer($event)" (pointerdown)="onPointer($event)">
				@for (pie of pies(); track pie.id) {
				<span class="pie" [style.left.%]="pie.x" [style.top.%]="pie.y"></span>
				}
				@for (pie of landed(); track pie.id) {
				<span class="pie" [style.left.%]="pie.x" [style.top.%]="pie.y"></span>
				}
				<img class="girl" src="/assets/games/honey-pie-girl.gif" alt="" [style.left.%]="girlX()" />
				@if (over()) {
				<p class="message">Game over<br />Press A to play again<br />Press B to exit</p>
				}
			</div>
		</section>
	`,
	styles: [`
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

		.pie {
			position: absolute;
			width: 8%;
			aspect-ratio: 1;
			border-radius: 50%;
			transform: translateX(-50%);
			background: radial-gradient(circle at 35% 35%, #fff3b0, #ffb703 45%, #c77d1a 100%);
			box-shadow: 0 0 8px rgba(255, 183, 3, 0.6);
		}

		/* Sizes are percentages of the field, so the girl and the pies scale with the screen. */
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
	`],
	host: {
		"(document:keydown)": "onKeyDown($event)",
		"(document:keyup)": "onKeyUp($event)",
	},
})
export class HoneyCatchComponent implements OnInit, OnDestroy {
	readonly pies = signal<Pie[]>([]);
	readonly girlX = signal(50);
	readonly score = signal(0);
	readonly landed = signal<Pie[]>([]);
	readonly running = signal(false);
	readonly over = signal(false);
	readonly best = signal(this.loadBest());

	private timer: ReturnType<typeof setInterval> | undefined;
	private ticks = 0;
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
		this.landed.set([]);
		this.ticks = 0;
		this.over.set(false);
		this.running.set(true);
		this.timer = setInterval(() => this.tick(), TICK_MS);
	}

	onPointer(event: PointerEvent): void {
		if (!this.running()) return;
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		this.girlX.set(this.clamp(((event.clientX - rect.left) / rect.width) * 100));
	}

	onKeyDown(event: KeyboardEvent): void {
		if (this.over()) {
			if (event.key.toLowerCase() === "a" || event.key === "Enter") this.start();
			return;
		}
		if (!this.running() || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
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
		const girlTop = 100 - ((field.clientWidth * GIRL_WIDTH * GIRL_RATIO) / field.clientHeight) * 100;
		const pieSize = ((field.clientWidth * PIE_WIDTH) / field.clientHeight) * 100;
		const fall = Math.min(0.8 + this.score() * 0.04, 2.2);
		const kept: Pie[] = [];
		const piled = [...this.landed()];
		let caught = 0;
		for (const pie of this.pies()) {
			const y = pie.y + fall;
			if (y + pieSize >= girlTop && Math.abs(pie.x - x) <= CATCH_RANGE) {
				caught++;
			} else if (y + pieSize >= 100) {
				// The pie lands on the ground or on the pile in its column and stays there.
				const below = piled.filter((other) => Math.abs(other.x - pie.x) < PIE_WIDTH * 100).length;
				piled.push({ ...pie, y: 100 - pieSize * (below + 1) });
			} else {
				kept.push({ ...pie, y });
			}
		}

		this.ticks++;
		if (this.ticks % SPAWN_EVERY_TICKS === 0) {
			kept.push({ id: this.nextId++, x: 8 + Math.random() * 84, y: 0 });
		}
		this.pies.set(kept);
		this.landed.set(piled);

		if (caught) this.score.update((score) => score + caught);
		if (piled.some((pie) => pie.y <= PILE_LIMIT)) this.end();
	}

	private end(): void {
		this.stop();
		this.over.set(true);
		this.running.set(false);
		if (this.score() > this.best()) {
			this.best.set(this.score());
			this.saveBest(this.best());
		}
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
