import { Component } from "@angular/core";

// Home hero for the Honey Pie theme: the artwork bobs gently and sparkles twinkle around it.
@Component({
	selector: "app-anime-scene",
	standalone: true,
	template: `
		<figure class="anime-scene">
			<img src="/assets/images/honey-pie-2.png" alt="" class="artwork" />
			@for (sparkle of sparkles; track $index) {
			<span class="sparkle" [style.left.%]="sparkle.x" [style.top.%]="sparkle.y" [style.animation-delay.s]="sparkle.delay">✦</span>
			}
		</figure>
	`,
	styles: [`
		.anime-scene {
			position: relative;
			margin: 2rem auto;
			max-width: min(720px, 92%);
			border-radius: var(--editor-radius);
			overflow: hidden;
			box-shadow: var(--box-shadow);
		}

		.artwork {
			display: block;
			width: 100%;
			height: auto;
			animation: bob 3.2s ease-in-out infinite;
		}

		.sparkle {
			position: absolute;
			color: #fff7b0;
			font-size: 2.2rem;
			text-shadow: 0 0 8px #ff9ad5;
			animation: twinkle 1.8s ease-in-out infinite;
			pointer-events: none;
		}

		@keyframes bob {
			0%, 100% { transform: translateY(0) rotate(0deg); }
			50% { transform: translateY(-10px) rotate(-1deg); }
		}

		@keyframes twinkle {
			0%, 100% { opacity: 0.2; transform: scale(0.6) rotate(0deg); }
			50% { opacity: 1; transform: scale(1.1) rotate(45deg); }
		}

		@media (prefers-reduced-motion: reduce) {
			.artwork,
			.sparkle {
				animation: none;
			}
		}
	`],
})
export class AnimeSceneComponent {
	readonly sparkles = [
		{ x: 8, y: 12, delay: 0 },
		{ x: 88, y: 8, delay: 0.4 },
		{ x: 14, y: 78, delay: 0.9 },
		{ x: 80, y: 70, delay: 1.3 },
		{ x: 50, y: 4, delay: 0.7 },
		{ x: 62, y: 88, delay: 1.7 },
	];
}
