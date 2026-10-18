import { Component, OnDestroy, computed, signal } from "@angular/core";

interface Pie {
	id: number;
	x: number;
	y: number;
}

const BEST_KEY = "honey-catch-best";
const TICK_MS = 40;
const LIVES = 3;
// Positions are percentages of the field. The figure stands at the bottom, so a pie is caught when it reaches its height.
const CATCH_LINE = 68;
const CATCH_RANGE = 10;
const STEP = 1.6;
const SPAWN_EVERY_TICKS = 16;

// Catch the honey pies with the girl from the picture. Move with the pointer or the arrow keys.
@Component({
	selector: "app-honey-catch",
	standalone: true,
	template: `
		<section class="honey-catch">
			<header class="hud">
				<span>Score <b>{{ score() }}</b></span>
				<span>Best <b>{{ best() }}</b></span>
				<span class="lives" aria-label="Lives">{{ hearts() }}</span>
				@if (!running()) {
				<button type="button" (click)="start()">{{ over() ? "Play again" : "Start" }}</button>
				}
			</header>
			<div class="field" (pointermove)="onPointer($event)" (pointerdown)="onPointer($event)">
				@for (pie of pies(); track pie.id) {
				<span class="pie" [style.left.%]="pie.x" [style.top.%]="pie.y"></span>
				}
				<div class="girl" [style.left.%]="girlX()"></div>
				@if (over()) {
				<p class="message">Game over</p>
				}
			</div>
		</section>
	`,
	styles: [`
		.honey-catch {
			width: 100%;
			max-width: 480px;
			margin: 2rem auto;
			font-family: var(--font-ui);
		}

		.hud {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 12px 18px;
			margin-bottom: 8px;
			font-size: 0.9rem;
		}

		.hud b {
			font-weight: 600;
		}

		.lives {
			color: #ff6b9a;
		}

		.hud button {
			margin-left: auto;
			padding: 2px 12px;
			border: 1px solid var(--theme-border);
			border-radius: 4px;
			background-color: var(--theme-surface);
			color: inherit;
			font: inherit;
			cursor: pointer;
		}

		.field {
			position: relative;
			width: 100%;
			aspect-ratio: 4 / 3;
			overflow: hidden;
			touch-action: none;
			border: 1px solid var(--theme-border);
			border-top: 2px solid var(--theme-accent);
			border-radius: var(--editor-radius);
			background-color: var(--theme-panel);
		}

		.pie {
			position: absolute;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			transform: translateX(-50%);
			background: radial-gradient(circle at 35% 35%, #fff3b0, #ffb703 45%, #c77d1a 100%);
			box-shadow: 0 0 8px rgba(255, 183, 3, 0.6);
		}

		/* The girl is cropped from the picture: her face and shoulders. */
		.girl {
			position: absolute;
			bottom: 0;
			width: 120px;
			height: 120px;
			transform: translateX(-50%);
			border-radius: 50%;
			background: url("/assets/images/honey-pie-2.png") no-repeat;
			background-size: 560px auto;
			background-position: -121px -35px;
			box-shadow: 0 0 0 3px var(--theme-accent);
		}

		.message {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			margin: 0;
			font-size: 1.2rem;
			background-color: color-mix(in srgb, var(--theme-bg) 60%, transparent);
		}
	`],
	host: {
		"(document:keydown)": "onKeyDown($event)",
		"(document:keyup)": "onKeyUp($event)",
	},
})
export class HoneyCatchComponent implements OnDestroy {
	readonly pies = signal<Pie[]>([]);
	readonly girlX = signal(50);
	readonly score = signal(0);
	readonly lives = signal(LIVES);
	readonly running = signal(false);
	readonly over = signal(false);
	readonly best = signal(this.loadBest());
	readonly hearts = computed(() => "♥".repeat(this.lives()));

	private timer: ReturnType<typeof setInterval> | undefined;
	private ticks = 0;
	private nextId = 0;
	private readonly keys = new Set<string>();

	start(): void {
		this.stop();
		this.pies.set([]);
		this.girlX.set(50);
		this.score.set(0);
		this.lives.set(LIVES);
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

		const fall = Math.min(0.8 + this.score() * 0.04, 2.2);
		const kept: Pie[] = [];
		let caught = 0;
		let missed = 0;
		for (const pie of this.pies()) {
			const y = pie.y + fall;
			if (y >= CATCH_LINE && Math.abs(pie.x - x) <= CATCH_RANGE) {
				caught++;
			} else if (y >= 100) {
				missed++;
			} else {
				kept.push({ ...pie, y });
			}
		}

		this.ticks++;
		if (this.ticks % SPAWN_EVERY_TICKS === 0) {
			kept.push({ id: this.nextId++, x: 8 + Math.random() * 84, y: 0 });
		}
		this.pies.set(kept);

		if (caught) this.score.update((score) => score + caught);
		if (missed) this.lives.update((lives) => Math.max(0, lives - missed));
		if (this.lives() === 0) this.end();
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
