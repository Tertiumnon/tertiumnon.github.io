import { Component } from "@angular/core";

// Keys sent for each on-screen button. Games and the menu already listen for these keys.
const PAD_KEYS = {
	up: ["ArrowUp"],
	down: ["ArrowDown"],
	left: ["ArrowLeft"],
	right: ["ArrowRight"],
	// A starts a game in the menu (Enter) and shoots in Hello World (Space).
	a: ["Enter", " "],
	// B goes back to the menu (Escape).
	b: ["Escape"],
} as const;

type PadButton = keyof typeof PAD_KEYS;

// On-screen controls along the bottom of the TV screen. Pressing a button sends its key to the document.
@Component({
	selector: "app-screen-pad",
	standalone: true,
	template: `
		<div class="pad" role="group" aria-label="Controls">
			<div class="dpad">
				<button type="button" class="key up" aria-label="Up" (pointerdown)="press('up')" (pointerup)="release('up')" (pointerleave)="release('up')">▲</button>
				<button type="button" class="key left" aria-label="Left" (pointerdown)="press('left')" (pointerup)="release('left')" (pointerleave)="release('left')">◀</button>
				<button type="button" class="key right" aria-label="Right" (pointerdown)="press('right')" (pointerup)="release('right')" (pointerleave)="release('right')">▶</button>
				<button type="button" class="key down" aria-label="Down" (pointerdown)="press('down')" (pointerup)="release('down')" (pointerleave)="release('down')">▼</button>
			</div>
			<div class="actions">
				<button type="button" class="key b" aria-label="B" (pointerdown)="press('b')" (pointerup)="release('b')" (pointerleave)="release('b')">B</button>
				<button type="button" class="key a" aria-label="A" (pointerdown)="press('a')" (pointerup)="release('a')" (pointerleave)="release('a')">A</button>
			</div>
		</div>
	`,
	styles: [`
		.pad {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			padding: 0 18px;
			background: #000;
			border-top: 4px solid #3b2a5a;
			font-family: "VT323", monospace;
			font-size: 1.6rem;
		}

		.dpad {
			display: grid;
			grid-template: '. up .' 'left . right' '. down .' / 30px 30px 30px;
			grid-auto-rows: 30px;
			gap: 2px;
		}

		.actions {
			display: flex;
			gap: 14px;
		}

		.key {
			width: 30px;
			height: 30px;
			padding: 0;
			border: 3px solid #000;
			background: #1a0a2e;
			color: #36f9f6;
			font: inherit;
			box-shadow: 0 4px 0 #000;
			touch-action: none;
			user-select: none;
			cursor: pointer;
		}

		.key:active {
			transform: translateY(3px);
			box-shadow: 0 1px 0 #000;
		}

		.up { grid-area: up; }
		.left { grid-area: left; }
		.right { grid-area: right; }
		.down { grid-area: down; }
		.a { width: 40px; height: 40px; background: #ff2e9a; color: #fff7b0; border-radius: 50%; }
		.b { width: 40px; height: 40px; background: #fff7b0; color: #1a0a2e; border-radius: 50%; }
	`],
})
export class ScreenPadComponent {
	press(button: PadButton): void {
		this.send("keydown", button);
	}

	release(button: PadButton): void {
		this.send("keyup", button);
	}

	private send(type: "keydown" | "keyup", button: PadButton): void {
		for (const key of PAD_KEYS[button]) {
			document.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
		}
	}
}
