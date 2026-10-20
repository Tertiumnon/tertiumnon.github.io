import {
	AfterViewInit,
	Component,
	ElementRef,
	effect,
	inject,
	input,
	OnDestroy,
	output,
} from "@angular/core";

// Marks the end of a lazy list. When it scrolls into the editor, the list asks for the next batch.
@Component({
	selector: "app-load-more",
	standalone: true,
	template: "",
	styles: [":host { display: block; height: 1px; }"],
})
export class LoadMoreComponent implements AfterViewInit, OnDestroy {
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
	private observer?: IntersectionObserver;
	private inView = false;

	readonly hasMore = input.required<boolean>();
	readonly reached = output<void>();

	constructor() {
		// The sentinel may already be in view when more items arrive (for example after the list loads),
		// and the observer does not report that again, so check when hasMore turns true.
		effect(() => {
			if (this.hasMore() && this.inView) this.reached.emit();
		});
	}

	ngAfterViewInit(): void {
		this.observer = new IntersectionObserver(
			(entries) => {
				this.inView = entries.some((entry) => entry.isIntersecting);
				if (this.hasMore() && this.inView) this.reached.emit();
			},
			{
				root: this.host.nativeElement.closest(".editor-content"),
				rootMargin: "200px 0px",
			},
		);
		this.observer.observe(this.host.nativeElement);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
