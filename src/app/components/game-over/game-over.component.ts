import { Component, input } from "@angular/core";

// Game-over panel shared by every game: the same arcade screen, score line and prompts.
// Content projected into the panel (such as a records table) appears above the prompts.
@Component({
	selector: "app-game-over",
	standalone: true,
	template: `
		<div class="game-over-overlay" [class.light]="light()" role="status">
			<section class="arcade-screen">
				<p class="arcade-kicker">★ INSERT COIN ★</p>
				<h2>GAME OVER</h2>
				<p class="final-score">SCORE <strong>{{ score() }}</strong></p>
				<ng-content></ng-content>
				<p class="press-prompt">Press A to play again<br />Press B to exit</p>
			</section>
		</div>
	`,
	styles: [`
		.game-over-overlay {
			position: absolute;
			inset: 0;
			z-index: 30;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12px;
			box-sizing: border-box;
			background-color: rgba(3, 5, 24, 0.94);
			color: #e8faff;
			font-family: "VT323", monospace;
			text-align: center;
		}

		.game-over-overlay.light {
			background-color: transparent;
		}

		.game-over-overlay.light .arcade-screen {
			background: rgba(5, 10, 38, 0.55);
		}

		.arcade-screen {
			width: min(100%, 520px);
			max-height: 100%;
			overflow-y: auto;
			padding: 12px;
			border: 3px double #35f2ff;
			background: rgba(5, 10, 38, 0.97);
			box-shadow: 0 0 12px rgba(53, 242, 255, 0.55), inset 0 0 18px rgba(53, 242, 255, 0.08);
			box-sizing: border-box;
		}

		.arcade-kicker {
			margin: 4px 0;
			color: #ffe45e;
			font-size: 19px;
			letter-spacing: 2px;
		}

		.arcade-screen h2 {
			margin: 4px 0 10px;
			color: #ff4db8;
			font-size: 44px;
			letter-spacing: 3px;
			text-shadow: 0 0 6px rgba(255, 77, 184, 0.85);
		}

		.final-score {
			margin: 5px 0;
			font-size: 20px;
		}

		.final-score strong {
			color: #6dff7a;
			font-size: 32px;
		}

		.press-prompt {
			margin: 12px 0 0;
			color: #fff7b0;
			text-shadow: 3px 3px 0 #ff2e9a;
			animation: blink 1s steps(2, start) infinite;
		}

		@keyframes blink {
			to { visibility: hidden; }
		}
	`],
})
export class GameOverComponent {
	readonly score = input.required<number>();
	readonly light = input(false);
}
