import { Component, input } from "@angular/core";

// Retro arcade cabinet shared by every game: marquee, CRT screen and control panel.
// The game goes into the [screen] slot, the game switch into the [controls] slot.
@Component({
	selector: "app-arcade-cabinet",
	standalone: true,
	template: `
		<section class="cabinet">
			<header class="marquee">{{ title() }}</header>
			<div class="bezel">
				<ng-content select="[screen]"></ng-content>
			</div>
			<footer class="panel">
				<div class="controls">
					<ng-content select="[controls]"></ng-content>
				</div>
				<div class="joystick" aria-hidden="true">
					<span class="base"></span>
					<span class="stick"></span>
				</div>
				<div class="buttons" aria-hidden="true">
					<i></i><i></i><i></i>
				</div>
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
			background:
				linear-gradient(180deg, #2a0f3a 0%, #120620 100%);
			border: 4px solid #000;
			box-shadow: inset 0 0 0 3px #ff6ec7, inset 0 0 0 6px #000, 0 0 0 4px #ff6ec7;
			image-rendering: pixelated;
		}

		.marquee {
			padding: 6px 12px;
			text-align: center;
			font-size: 2rem;
			letter-spacing: 0.3em;
			text-transform: uppercase;
			color: #fff7b0;
			background: repeating-linear-gradient(90deg, #ff2e9a 0 16px, #7c3cff 16px 32px);
			border: 4px solid #000;
			box-shadow: inset 0 -4px 0 #000, 0 0 16px #ff6ec7;
			text-shadow: 2px 2px 0 #000, 0 0 10px #fff7b0;
		}

		.bezel {
			position: relative;
			flex: 1;
			min-height: 0;
			display: grid;
			place-items: center;
			container-type: size;
			margin: 12px 0;
			padding: 12px;
			background: #000;
			border: 6px solid #3b2a5a;
			box-shadow: inset 0 0 40px #2b0a4a, 0 0 0 3px #000;
			overflow: hidden;
		}

		/* Scanlines and a dim vignette over the screen, like an old CRT. */
		.bezel::after {
			content: "";
			position: absolute;
			inset: 0;
			pointer-events: none;
			background:
				repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.28) 0 1px, transparent 1px 3px),
				radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.6) 100%);
		}

		.panel {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: 12px 18px;
			padding: 10px 14px 6px;
			border-top: 4px solid #000;
		}

		.controls {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
		}

		.joystick {
			position: relative;
			width: 40px;
			height: 40px;
		}

		.joystick .base {
			position: absolute;
			inset: 0;
			border-radius: 50%;
			background: #000;
			box-shadow: inset 0 3px 0 #2b0a4a;
		}

		.joystick .stick {
			position: absolute;
			left: 14px;
			top: -12px;
			width: 12px;
			height: 30px;
			background: #ff6ec7;
			border: 2px solid #000;
		}

		.buttons {
			display: flex;
			gap: 10px;
		}

		.buttons i {
			width: 24px;
			height: 24px;
			background: #fff7b0;
			border: 3px solid #000;
			box-shadow: 0 4px 0 #000;
		}

		.buttons i:nth-child(2) { background: #36f9f6; }
		.buttons i:nth-child(3) { background: #ff2e9a; }
	`],
})
export class ArcadeCabinetComponent {
	readonly title = input("Arcade");
}
