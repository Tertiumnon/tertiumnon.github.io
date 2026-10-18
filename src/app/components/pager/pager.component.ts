import { Component, ElementRef, inject, input, output } from "@angular/core";

// Previous / next pager shared by the list pages. Every page change scrolls the editor back to the top.
@Component({
	selector: "app-pager",
	standalone: true,
	templateUrl: "./pager.component.html",
	styleUrl: "./pager.component.css",
})
export class PagerComponent {
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly page = input.required<number>();
	readonly pageCount = input.required<number>();
	readonly pageChange = output<number>();

	go(page: number): void {
		this.pageChange.emit(page);
		this.host.nativeElement.closest(".editor-content")?.scrollTo({ top: 0 });
	}
}
