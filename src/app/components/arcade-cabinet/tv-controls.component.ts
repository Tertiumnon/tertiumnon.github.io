import { Component, inject, input, output } from "@angular/core";
import { SoundService } from "../sound/sound.service";

// Front panel of the arcade cabinet: a volume dial and a power rocker, coloured from the theme.
@Component({
	selector: "app-tv-controls",
	standalone: true,
	template: `
		<!-- Window keys: the cabinet covers the browser window, or the whole screen. -->
		<div class="control">
			<button type="button" class="key" [class.on]="fullWindow()" [attr.aria-pressed]="fullWindow()" aria-label="Full window" title="Full window" (click)="windowToggle.emit()">
				<svg viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M1 3h14v10H1z M2 5v6h12V5z" /></svg>
			</button>
			<span class="caption">Window</span>
		</div>
		<div class="control">
			<button type="button" class="key" [class.on]="fullscreen()" [attr.aria-pressed]="fullscreen()" aria-label="Full screen" title="Full screen" (click)="fullscreenToggle.emit()">
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 1h5v2H3v3H1z M15 1v5h-2V3h-3V1z M15 15h-5v-2h3v-3h2z M1 15v-5h2v3h3v2z" /></svg>
			</button>
			<span class="caption">Screen</span>
		</div>
		<!-- Volume dial: turned up when the sound is on, turned down when muted. -->
		<div class="control">
			<button type="button" class="knob" [style.--dial]="sound.muted() ? '-135deg' : '45deg'" [attr.aria-pressed]="!sound.muted()" [attr.aria-label]="sound.muted() ? 'Sound off' : 'Sound on'" [attr.title]="sound.muted() ? 'Sound off' : 'Sound on'" (click)="sound.toggleMuted()">
				<!-- Pixel speaker: volume bars when the sound is on, a cross when it is muted. -->
				<svg class="volume" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
					<path d="M1 6h3v4H1z M4 5h1v6H4z M5 4h1v8H5z M6 3h1v10H6z" />
					@if (sound.muted()) {
					<path d="M9 5h1v1H9z M10 6h1v1h-1z M11 7h1v1h-1z M12 8h1v1h-1z M13 9h1v1h-1z M13 5h1v1h-1z M12 6h1v1h-1z M10 8h1v1h-1z M9 9h1v1H9z" />
					} @else {
					<path d="M9 6h1v4H9z M11 4h1v8h-1z M13 2h1v12h-1z" />
					}
				</svg>
			</button>
			<span class="caption">Volume</span>
		</div>
		<!-- Power rocker: lit and pressed in when the set is on. -->
		<div class="control">
			<button type="button" class="power" [class.on]="powered()" [attr.aria-pressed]="powered()" aria-label="Power" (click)="powerToggle.emit()">
				<span class="led"></span>
			</button>
			<span class="caption">Power</span>
		</div>
	`,
	styles: [`
		:host {
			--ctl-light: color-mix(in srgb, var(--tv-text) 70%, #fff);
			--ctl-mid: color-mix(in srgb, var(--tv-text) 35%, var(--tv-glass));
			--ctl-dark: var(--tv-glass);
		}

		:host {
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
			gap: 28px;
			padding: 10px 18px 8px;
			border-top: 4px solid var(--ctl-dark);
		}

		.control {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4px;
		}

		.caption {
			font-size: 0.8em;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			color: var(--tv-text);
		}

		/* Volume dial: a machined metal knob on a printed plate. --dial turns the pointer. */
		.knob {
			position: relative;
			isolation: isolate;
			box-sizing: border-box;
			display: grid;
			place-items: center;
			width: 52px;
			height: 52px;
			padding: 0;
			border: 0;
			border-radius: 50%;
			background: radial-gradient(circle at 50% 28%, var(--ctl-light) 0%, var(--ctl-mid) 55%, var(--ctl-dark) 100%);
			box-shadow: 0 6px 6px var(--ctl-dark), 0 0 0 2px var(--ctl-dark), inset 0 -3px 4px var(--ctl-dark), inset 0 2px 2px var(--ctl-light);
			color: var(--tv-glow);
			cursor: pointer;
		}

		/* Printed plate with tick marks around the knob. */
		.knob::before {
			content: "";
			position: absolute;
			z-index: -1;
			inset: -12px;
			border-radius: 50%;
			background:
				repeating-conic-gradient(var(--tv-text) 0 1deg, transparent 1deg 27deg),
				radial-gradient(circle, var(--ctl-mid) 60%, var(--ctl-dark) 100%);
			mask: radial-gradient(circle, transparent 60%, #000 62%, #000 74%, transparent 76%);
			opacity: 0.85;
		}

		/* Pointer, turned by --dial around the centre of the knob. */
		.knob::after {
			content: "";
			position: absolute;
			inset: 0;
			background: linear-gradient(var(--tv-title), var(--tv-title)) center 4px / 3px 14px no-repeat;
			transform: rotate(var(--dial, 45deg));
			transition: transform 0.2s steps(4);
		}

		/* Window keys: square bevelled keys, pressed in while active. */
		.key {
			display: grid;
			place-items: center;
			width: 30px;
			height: 30px;
			padding: 0;
			border: 0;
			border-radius: 4px;
			background: linear-gradient(var(--ctl-light), var(--ctl-mid));
			box-shadow: 0 3px 0 var(--ctl-dark), 0 0 0 2px var(--ctl-dark);
			color: var(--ctl-dark);
			cursor: pointer;
		}

		.key svg {
			width: 16px;
			height: 16px;
			fill: currentColor;
		}

		.key:active,
		.key.on {
			transform: translateY(2px);
			box-shadow: 0 1px 0 var(--ctl-dark), 0 0 0 2px var(--ctl-dark);
		}

		.volume {
			width: 22px;
			height: 22px;
			fill: currentColor;
		}

		/* Rocker power switch: a sunken bezel with a tilting lever. The top of the lever is pressed in while on. */
		.power {
			position: relative;
			isolation: isolate;
			box-sizing: border-box;
			width: 36px;
			height: 54px;
			padding: 4px;
			border: 0;
			border-radius: 5px;
			background: var(--ctl-dark);
			box-shadow: inset 0 2px 4px var(--ctl-dark), 0 1px 0 var(--ctl-light), 0 0 0 2px var(--ctl-dark);
			cursor: pointer;
		}

		/* The lever: a bevelled key that tilts around its middle. */
		.power::before {
			content: "";
			position: absolute;
			z-index: -1;
			inset: 4px;
			border-radius: 3px;
			background: linear-gradient(var(--ctl-light) 0%, var(--ctl-mid) 35%, var(--ctl-dark) 50%, var(--ctl-mid) 51%, var(--ctl-dark) 100%);
			box-shadow: 0 4px 5px var(--ctl-dark), inset 0 1px 0 var(--ctl-light);
			transform: perspective(80px) rotateX(-14deg);
			transform-origin: center;
			transition: transform 0.12s ease-out;
		}

		.power.on::before {
			transform: perspective(80px) rotateX(14deg);
		}

		/* Status light above the lever. */
		.power .led {
			position: absolute;
			left: 50%;
			top: -10px;
			width: 8px;
			height: 8px;
			margin-left: -4px;
			border-radius: 50%;
			background: color-mix(in srgb, var(--tv-glow) 20%, var(--ctl-dark));
			box-shadow: inset 0 1px 1px var(--ctl-dark);
		}

		.power.on .led {
			background: var(--tv-glow);
			box-shadow: 0 0 8px var(--tv-glow);
		}
	`],
})
export class TvControlsComponent {
	readonly powered = input.required<boolean>();
	readonly fullWindow = input(false);
	readonly fullscreen = input(false);
	readonly windowToggle = output<void>();
	readonly fullscreenToggle = output<void>();
	readonly powerToggle = output<void>();
	readonly sound = inject(SoundService);
}
