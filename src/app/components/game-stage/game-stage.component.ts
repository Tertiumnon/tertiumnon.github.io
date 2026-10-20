import {
	type AfterViewInit,
	Component,
	type ElementRef,
	inject,
	type OnDestroy,
	viewChild,
} from "@angular/core";
import { ArcadeScreenService } from "./game-screen.service";

// The TV screen area. The game fills it, and its size is published for the game to use.
@Component({
	selector: "app-game-stage",
	standalone: true,
	template: `<div class="play" #play><ng-content></ng-content></div>`,
	styles: [
		`
		:host {
			display: block;
			width: 100%;
			height: 100%;
		}

		.play {
			position: relative;
			width: 100%;
			height: 100%;
		}
	`,
	],
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
