import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from "@angular/core";
import { ArcadeScreenService } from "./game-screen.service";

// The TV screen area. The play field fills it above the on-screen pad, and its size is published for the game.
@Component({
	selector: "app-game-stage",
	standalone: true,
	template: `
		<div class="stage">
			<div class="play" #play><ng-content></ng-content></div>
			<div class="pad"><ng-content select="[pad]"></ng-content></div>
		</div>
	`,
	styles: [`
		:host {
			--pad-height: 110px;
			display: block;
			width: 100%;
			height: 100%;
		}

		.stage {
			position: relative;
			width: 100%;
			height: 100%;
		}

		.play {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: var(--pad-height);
		}

		.pad {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: var(--pad-height);
		}
	`],
})
export class GameStageComponent implements AfterViewInit, OnDestroy {
	private readonly screen = inject(ArcadeScreenService);
	private readonly play = viewChild.required<ElementRef<HTMLElement>>("play");
	private observer?: ResizeObserver;

	ngAfterViewInit(): void {
		this.observer = new ResizeObserver(([entry]) => {
			this.screen.width.set(Math.floor(entry.contentRect.width));
			this.screen.height.set(Math.floor(entry.contentRect.height));
		});
		this.observer.observe(this.play().nativeElement);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
