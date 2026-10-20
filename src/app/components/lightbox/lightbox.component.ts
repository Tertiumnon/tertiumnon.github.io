import { Component, HostListener, inject } from "@angular/core";
import { LightboxService } from "./lightbox.service";

// Popup with a picture at full size. A click anywhere or Escape closes it.
@Component({
	selector: "app-lightbox",
	standalone: true,
	template: `
		@if (lightbox.src(); as src) {
		<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image" (click)="lightbox.close()">
			<img [src]="src" alt="" />
		</div>
		}
	`,
	styles: [
		`
		.lightbox {
			position: fixed;
			inset: 0;
			z-index: 2000;
			display: grid;
			place-items: center;
			padding: 16px;
			background: rgba(0, 0, 0, 0.85);
			cursor: zoom-out;
		}

		.lightbox img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			border: 1px solid var(--theme-border);
			border-radius: var(--editor-radius);
			background: var(--theme-panel);
			box-shadow: var(--box-shadow--hover);
		}
	`,
	],
})
export class LightboxComponent {
	readonly lightbox = inject(LightboxService);

	@HostListener("document:keydown.escape")
	onEscape(): void {
		this.lightbox.close();
	}
}
