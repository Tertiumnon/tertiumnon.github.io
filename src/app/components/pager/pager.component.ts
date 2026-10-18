import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, output } from "@angular/core";

// A swipe must be at least this tall (px) to count as scrolling past the end.
const SWIPE_THRESHOLD = 40;
// Time (ms) after a scroll-driven page change before another one is allowed.
const SCROLL_MOVE_COOLDOWN = 600;

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
	private lastScrollMove = 0;

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
				if (event.deltaY < 0) this.previousIfAtStart(scroller);
			};
			const onTouchStart = (event: TouchEvent): void => {
				touchStartY = event.touches[0].clientY;
			};
			const onTouchEnd = (event: TouchEvent): void => {
				const swipe = touchStartY - event.changedTouches[0].clientY;
				if (swipe > SWIPE_THRESHOLD) this.nextIfAtEnd(scroller);
				if (swipe < -SWIPE_THRESHOLD) this.previousIfAtStart(scroller);
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
		if (atEnd && this.page() < this.pageCount()) this.moveFromScroll(this.page() + 1);
	}

	// Scrolling or swiping up while the list is at its top moves back to the previous page.
	private previousIfAtStart(scroller: HTMLElement): void {
		if (scroller.scrollTop <= 0 && this.page() > 1) this.moveFromScroll(this.page() - 1);
	}

	// One gesture can send many wheel events; the cooldown stops it from turning several pages.
	private moveFromScroll(page: number): void {
		const now = Date.now();
		if (now - this.lastScrollMove < SCROLL_MOVE_COOLDOWN) return;
		this.lastScrollMove = now;
		this.go(page);
	}

	go(page: number): void {
		this.pageChange.emit(page);
		this.host.nativeElement.closest(".editor-content")?.scrollTo({ top: 0 });
	}
}
