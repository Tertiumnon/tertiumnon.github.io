import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, output } from "@angular/core";

// A swipe must be at least this tall (px) to count as scrolling past the end.
const SWIPE_THRESHOLD = 40;

// Previous / next pager shared by the list pages. Every page change scrolls the editor back to the top.
@Component({
	selector: "app-pager",
	standalone: true,
	templateUrl: "./pager.component.html",
	styleUrl: "./pager.component.css",
})
export class PagerComponent {
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly page = input.required<number>();
	readonly pageCount = input.required<number>();
	readonly pageChange = output<number>();

	constructor() {
		// Scrolling or swiping down while the list is at its end moves on to the next page.
		afterNextRender(() => {
			const scroller = this.host.nativeElement.closest<HTMLElement>(".editor-content");
			if (!scroller) return;
			let touchStartY = 0;
			const onWheel = (event: WheelEvent): void => {
				if (event.deltaY > 0) this.nextIfAtEnd(scroller);
			};
			const onTouchStart = (event: TouchEvent): void => {
				touchStartY = event.touches[0].clientY;
			};
			const onTouchEnd = (event: TouchEvent): void => {
				if (touchStartY - event.changedTouches[0].clientY > SWIPE_THRESHOLD) this.nextIfAtEnd(scroller);
			};
			scroller.addEventListener("wheel", onWheel, { passive: true });
			scroller.addEventListener("touchstart", onTouchStart, { passive: true });
			scroller.addEventListener("touchend", onTouchEnd, { passive: true });
			this.destroyRef.onDestroy(() => {
				scroller.removeEventListener("wheel", onWheel);
				scroller.removeEventListener("touchstart", onTouchStart);
				scroller.removeEventListener("touchend", onTouchEnd);
			});
		});
	}

	private nextIfAtEnd(scroller: HTMLElement): void {
		const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
		if (atEnd && this.page() < this.pageCount()) this.go(this.page() + 1);
	}

	go(page: number): void {
		this.pageChange.emit(page);
		this.host.nativeElement.closest(".editor-content")?.scrollTo({ top: 0 });
	}
}
