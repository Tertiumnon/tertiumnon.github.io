import { AfterViewInit, Component, ElementRef, OnDestroy, signal, viewChild } from "@angular/core";

// Every game is laid out on the same design surface, which is scaled to fit the window and centred.
export const GAME_DESIGN_WIDTH = 720;
export const GAME_DESIGN_HEIGHT = 540;

@Component({
	selector: "app-game-stage",
	standalone: true,
	template: `
		<div class="stage" #stage>
			<div class="design" [style.transform]="'scale(' + scale() + ')'">
				<ng-content></ng-content>
			</div>
		</div>
	`,
	styles: [`
		:host {
			display: block;
			width: 100%;
		}

		.stage {
			position: relative;
			/* Fills the cabinet screen (a size container) while keeping the design proportions. */
			width: min(100cqw, calc(100cqh * ${GAME_DESIGN_WIDTH} / ${GAME_DESIGN_HEIGHT}));
			aspect-ratio: ${GAME_DESIGN_WIDTH} / ${GAME_DESIGN_HEIGHT};
			margin: 0 auto;
		}

		.design {
			position: absolute;
			left: 0;
			top: 0;
			width: ${GAME_DESIGN_WIDTH}px;
			height: ${GAME_DESIGN_HEIGHT}px;
			transform-origin: 0 0;
		}
	`],
})
export class GameStageComponent implements AfterViewInit, OnDestroy {
	private readonly stage = viewChild.required<ElementRef<HTMLElement>>("stage");
	private observer?: ResizeObserver;
	readonly scale = signal(1);

	ngAfterViewInit(): void {
		this.observer = new ResizeObserver(([entry]) => {
			this.scale.set(entry.contentRect.width / GAME_DESIGN_WIDTH);
		});
		this.observer.observe(this.stage().nativeElement);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
