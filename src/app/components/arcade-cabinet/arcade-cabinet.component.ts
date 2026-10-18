import { Component, ElementRef, HostListener, inject, output, signal, viewChild } from "@angular/core";
import { SoundService } from "../sound/sound.service";
import { TvControlsComponent } from "./tv-controls.component";

// Retro arcade cabinet: rounded CRT screen and power button. Colours come from the theme (--tv-* tokens).
// The game goes into the [screen] slot.
@Component({
	selector: "app-arcade-cabinet",
	standalone: true,
	imports: [TvControlsComponent],
	template: `
		<section class="cabinet" [class.full-window]="fullWindow()">
			<div class="bezel" [class.off]="!powered()">
				<div class="screen" #screen>
					<ng-content select="[screen]"></ng-content>
				</div>
				<span class="power-dot" aria-hidden="true"></span>
			</div>
			<app-tv-controls
				[powered]="powered()"
				[fullWindow]="fullWindow()"
				[fullscreen]="fullscreen()"
				(powerToggle)="togglePower()"
				(windowToggle)="toggleFullWindow()"
				(fullscreenToggle)="toggleFullscreen()"
			></app-tv-controls>
		</section>
	`,
	styles: [`
		:host {
			display: block;
			height: 100%;
		}

		/* Full window: the cabinet covers the whole browser window. */
		.cabinet.full-window {
			position: fixed;
			inset: 0;
			z-index: 1000;
		}

		/* Fills the window: the panel keeps its height, the screen takes the rest. */
		.cabinet {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: clamp(4px, 1vw, 10px);
			font-family: "VT323", monospace;
			font-size: 1.25rem;
			color: var(--tv-text);
			background: var(--tv-case);
			border: 4px solid #000;
			box-shadow: inset 0 0 0 3px var(--tv-glow), inset 0 0 0 6px #000, 0 0 0 4px var(--tv-glow);
		}

		/* Old TV: a thick rounded plastic case around a curved glass screen. */
		.bezel {
			position: relative;
			flex: 1;
			min-height: 0;
			display: grid;
			place-items: center;
			margin: clamp(3px, 1.2vh, 12px) 0;
			padding: clamp(6px, 2vw, 22px);
			border-radius: 48px / 40px;
			background: var(--tv-bezel);
			border: 4px solid #000;
			box-shadow: inset 0 3px 0 #5a4d6e, inset 0 -6px 0 #15101c, 0 0 0 3px #000;
		}

		.screen {
			--scan: clamp(1px, 0.25vh, 2px);
			position: relative;
			width: 100%;
			height: 100%;
			display: grid;
			place-items: stretch;
			container-type: size;
			overflow: hidden;
			border-radius: 34px / 28px;
			background: var(--tv-glass);
			box-shadow: inset 0 0 60px #000, inset 0 0 0 4px #0b0a0f;
		}

		/* Scanlines and a dim curved vignette over the glass. */
		.screen::after {
			content: "";
			position: absolute;
			inset: 0;
			pointer-events: none;
			background:
				repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.28) 0 var(--scan), transparent var(--scan) calc(var(--scan) * 3)),
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

	`],
})
export class ArcadeCabinetComponent {
	readonly powered = signal(true);
	readonly fullWindow = signal(false);
	readonly fullscreen = signal(false);
	// Emits the new power state after each switch.
	readonly powerChange = output<boolean>();
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly sound = inject(SoundService);
	private readonly screen = viewChild.required<ElementRef<HTMLElement>>("screen");

	toggleFullWindow(): void {
		this.fullWindow.update((on) => !on);
	}

	// The browser's own full-screen mode; Escape leaves it, which the fullscreenchange event reports back.
	toggleFullscreen(): void {
		if (document.fullscreenElement) void document.exitFullscreen();
		else void this.host.nativeElement.requestFullscreen().catch(() => undefined);
	}

	@HostListener("document:fullscreenchange")
	onFullscreenChange(): void {
		this.fullscreen.set(document.fullscreenElement === this.host.nativeElement);
	}

	togglePower(): void {
		this.powered.update((on) => !on);
		this.powerChange.emit(this.powered());
		this.sound.play("power");
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
