import { Component, input } from "@angular/core";

// Arcade cabinet frame shared by every game: marquee, screen bezel and control panel.
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
		.cabinet {
			width: min(100%, 780px);
			margin: 0 auto;
			border: 2px solid var(--theme-border);
			border-radius: 18px 18px 10px 10px;
			background: linear-gradient(180deg, var(--theme-surface), var(--theme-panel));
			box-shadow: var(--box-shadow);
		}

		.marquee {
			padding: 10px 12px;
			border-radius: 16px 16px 0 0;
			background: linear-gradient(90deg, var(--theme-accent), #ff9ad5, var(--theme-accent));
			color: var(--theme-bg);
			font-weight: 700;
			letter-spacing: 0.2em;
			text-align: center;
			text-transform: uppercase;
		}

		.bezel {
			display: flex;
			justify-content: center;
			margin: 14px;
			padding: 12px;
			border-radius: 10px;
			background: #050308;
			box-shadow: inset 0 0 18px #000, 0 0 0 3px var(--theme-border);
		}

		.panel {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: 12px 18px;
			padding: 12px 18px 18px;
			border-top: 3px solid var(--theme-border);
		}

		.controls {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}

		.joystick {
			position: relative;
			width: 36px;
			height: 36px;
		}

		.joystick .base {
			position: absolute;
			inset: 0;
			border-radius: 50%;
			background: #1b1b22;
			box-shadow: inset 0 2px 4px #000;
		}

		.joystick .stick {
			position: absolute;
			left: 13px;
			top: -10px;
			width: 10px;
			height: 26px;
			border-radius: 5px;
			background: #e8e8f0;
		}

		.buttons {
			display: flex;
			gap: 8px;
		}

		.buttons i {
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background: var(--theme-accent);
			box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.3);
		}
	`],
})
export class ArcadeCabinetComponent {
	readonly title = input("Arcade");
}
