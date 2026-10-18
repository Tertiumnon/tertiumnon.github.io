import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from "@angular/core";
import { ArcadeScreenService } from "./game-screen.service";

// The TV screen area. The game inside fills it, and its size is published for the game to use.
@Component({
	selector: "app-game-stage",
	standalone: true,
	template: `<div class="stage" #stage><ng-content></ng-content></div>`,
	styles: [`
		:host {
			display: block;
			width: 100%;
			height: 100%;
		}

		.stage {
			position: relative;
			width: 100%;
			height: 100%;
		}
	`],
})
export class GameStageComponent implements AfterViewInit, OnDestroy {
	private readonly screen = inject(ArcadeScreenService);
	private readonly stage = viewChild.required<ElementRef<HTMLElement>>("stage");
	private observer?: ResizeObserver;

	ngAfterViewInit(): void {
		this.observer = new ResizeObserver(([entry]) => {
			this.screen.width.set(Math.floor(entry.contentRect.width));
			this.screen.height.set(Math.floor(entry.contentRect.height));
		});
		this.observer.observe(this.stage().nativeElement);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
