import {
	type AfterViewInit,
	Component,
	ElementRef,
	inject,
	type OnDestroy,
	viewChild,
} from "@angular/core";

// The Matrix rain, drawn on the TV screen while it is idle (ported from tertium-hlpr's matrix animation).
@Component({
	selector: "app-matrix-rain",
	standalone: true,
	template: `<canvas #canvas aria-hidden="true"></canvas>`,
	styles: [
		`
    :host {
      position: absolute;
      inset: 0;
      display: block;
      background: #000;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
	],
})
export class MatrixRainComponent implements AfterViewInit, OnDestroy {
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly canvas =
		viewChild.required<ElementRef<HTMLCanvasElement>>("canvas");
	private readonly glyphs =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ";
	private readonly cell = 14;
	private drops: number[] = [];
	private frame?: number;
	private observer?: ResizeObserver;

	ngAfterViewInit(): void {
		const canvas = this.canvas().nativeElement;
		const context = canvas.getContext("2d");
		if (!context) return;

		// The trail uses the TV glow colour of the current theme; the head is always the brightest.
		const trail =
			getComputedStyle(this.host.nativeElement)
				.getPropertyValue("--tv-glow")
				.trim() || "#00ff41";
		const resize = (): void => {
			const { width, height } = this.host.nativeElement.getBoundingClientRect();
			canvas.width = Math.max(1, Math.floor(width));
			canvas.height = Math.max(1, Math.floor(height));
			const columns = Math.ceil(canvas.width / this.cell);
			const rows = Math.ceil(canvas.height / this.cell);
			// Each column starts at a random height, so the rain is already falling when the screen appears.
			this.drops = Array.from(
				{ length: columns },
				() => -Math.floor(Math.random() * rows),
			);
			context.fillStyle = "#000";
			context.fillRect(0, 0, canvas.width, canvas.height);
		};
		this.observer = new ResizeObserver(resize);
		this.observer.observe(this.host.nativeElement);
		resize();

		let last = 0;
		const draw = (time: number): void => {
			this.frame = requestAnimationFrame(draw);
			// About 16 frames a second, like the terminal version.
			if (time - last < 60) return;
			last = time;

			context.fillStyle = "rgba(0, 0, 0, 0.12)";
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.font = `${this.cell}px monospace`;
			this.drops.forEach((row, column) => {
				const x = column * this.cell;
				const y = row * this.cell;
				const glyph =
					this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
				context.fillStyle = trail;
				context.fillText(glyph, x, y - this.cell);
				context.fillStyle = "#e8ffe8";
				context.fillText(glyph, x, y);
				if (y > canvas.height && Math.random() > 0.975) this.drops[column] = 0;
				else this.drops[column]++;
			});
		};
		this.frame = requestAnimationFrame(draw);
	}

	ngOnDestroy(): void {
		if (this.frame !== undefined) cancelAnimationFrame(this.frame);
		this.observer?.disconnect();
	}
}
