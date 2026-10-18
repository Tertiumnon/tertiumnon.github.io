import { Component, ElementRef, input, signal, viewChild } from "@angular/core";

// Retro arcade cabinet: marquee, rounded CRT screen and power button. Game controls are drawn on the screen.
// The game goes into the [screen] slot.
@Component({
	selector: "app-arcade-cabinet",
	standalone: true,
	template: `
		<section class="cabinet">
			<header class="marquee">{{ title() }}</header>
			<div class="bezel" [class.off]="!powered()">
				<div class="screen" #screen>
					<ng-content select="[screen]"></ng-content>
				</div>
				<span class="power-dot" aria-hidden="true"></span>
			</div>
			<footer class="panel">
				<button type="button" class="power" [class.on]="powered()" [attr.aria-pressed]="powered()" aria-label="Power" (click)="togglePower()">
					<span class="led"></span>
				</button>
			</footer>
		</section>
	`,
	styles: [`
		/* Fills the window: the marquee and panel keep their height, the screen takes the rest. */
		.cabinet {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 10px;
			font-family: "VT323", monospace;
			font-size: 1.25rem;
			color: #ffe9f6;
			background: linear-gradient(180deg, #2a0f3a 0%, #120620 100%);
			border: 4px solid #000;
			box-shadow: inset 0 0 0 3px #ff6ec7, inset 0 0 0 6px #000, 0 0 0 4px #ff6ec7;
		}

		.marquee {
			padding: 6px 12px;
			text-align: center;
			font-size: 2rem;
			letter-spacing: 0.3em;
			text-transform: uppercase;
			color: #fff7b0;
			background: linear-gradient(#0006, #0006), url("/assets/images/honey-pie.png") center / cover;
			border: 4px solid #000;
			box-shadow: inset 0 -4px 0 #000, 0 0 16px #ff6ec7;
			text-shadow: 2px 2px 0 #000;
		}

		/* Old TV: a thick rounded plastic case around a curved glass screen. */
		.bezel {
			position: relative;
			flex: 1;
			min-height: 0;
			display: grid;
			place-items: center;
			margin: 12px 0;
			padding: 22px;
			border-radius: 48px / 40px;
			background: linear-gradient(180deg, #3b3346, #221c2b);
			border: 4px solid #000;
			box-shadow: inset 0 3px 0 #5a4d6e, inset 0 -6px 0 #15101c, 0 0 0 3px #000;
		}

		.screen {
			position: relative;
			width: 100%;
			height: 100%;
			display: grid;
			place-items: stretch;
			container-type: size;
			overflow: hidden;
			border-radius: 34px / 28px;
			background: #000;
			box-shadow: inset 0 0 60px #000, inset 0 0 0 4px #0b0a0f;
		}

		/* Scanlines and a dim curved vignette over the glass. */
		.screen::after {
			content: "";
			position: absolute;
			inset: 0;
			pointer-events: none;
			background:
				repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.28) 0 1px, transparent 1px 3px),
				radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.75) 100%);
		}

		/* Glare on the glass. */
		.screen::before {
			content: "";
			position: absolute;
			inset: 0;
			pointer-events: none;
			background: radial-gradient(ellipse at 28% 18%, rgba(255, 255, 255, 0.14), transparent 42%);
		}

		/* Power off: the glass goes dark and the picture collapses to a dot. */
		.bezel.off .screen {
			visibility: hidden;
		}

		.power-dot {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 6px;
			height: 6px;
			margin: -3px 0 0 -3px;
			border-radius: 50%;
			background: #fff;
			box-shadow: 0 0 12px #fff;
			opacity: 0;
			pointer-events: none;
		}

		.bezel.off .power-dot {
			animation: power-dot 0.5s ease-out forwards;
		}

		@keyframes power-dot {
			0% { opacity: 1; transform: scale(1, 1); }
			60% { opacity: 1; transform: scale(60, 0.6); }
			100% { opacity: 0; transform: scale(60, 0.02); }
		}

		.panel {
			display: flex;
			justify-content: flex-end;
			padding: 10px 14px 6px;
			border-top: 4px solid #000;
		}

		/* Round power button with a status light. */
		.power {
			position: relative;
			width: 46px;
			height: 46px;
			padding: 0;
			border: 3px solid #000;
			border-radius: 50%;
			background: radial-gradient(circle at 35% 35%, #5a4d6e, #221c2b);
			box-shadow: 0 5px 0 #000;
			cursor: pointer;
		}

		.power:active {
			transform: translateY(3px);
			box-shadow: 0 2px 0 #000;
		}

		.power .led {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 12px;
			height: 12px;
			margin: -6px 0 0 -6px;
			border-radius: 50%;
			background: #3a1020;
			border: 2px solid #000;
		}

		.power.on .led {
			background: #ff2e9a;
			box-shadow: 0 0 10px #ff2e9a;
		}
	`],
})
export class ArcadeCabinetComponent {
	readonly title = input("Arcade");
	readonly powered = signal(true);
	private readonly screen = viewChild.required<ElementRef<HTMLElement>>("screen");

	togglePower(): void {
		this.powered.update((on) => !on);
		if (this.powered()) {
			// Switching on: the picture stretches out from a line, like an old TV warming up.
			this.screen().nativeElement.animate(
				[
					{ transform: "scale(1, 0.01)", filter: "brightness(4)" },
					{ transform: "scale(1, 1.03)", filter: "brightness(1.3)", offset: 0.5 },
					{ transform: "scale(1, 1)", filter: "none" },
				],
				{ duration: 600, easing: "ease-out" },
			);
		}
	}
}
