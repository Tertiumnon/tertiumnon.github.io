import { Component, HostListener, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HelloWorldGameService, CellData } from "./hello-world-game.service";

@Component({
	selector: "app-hello-world-game",
	templateUrl: "./hello-world-game.component.html",
	styleUrls: ["./hello-world-game.component.css"],
	standalone: true,
	imports: [CommonModule],
})
export class HelloWorldGameComponent {
	phrase = "Hello";
	cells: CellData[] = [];

	colOffsetPx = 0;
	rowOffsetPx = 0;
	// used area (in local cell counts) and start offsets (in container cols/rows)
	usedCols = 0;
	usedRows = 0;
	startCol = 0;
	startRow = 0;
	// tank state (grid coords)
	tank = { col: 0, row: 0, color: '#ff3b30' };
	initialTank = { col: 0, row: 0, color: '#ff3b30' };

	// bullets: each bullet is a single-cell projectile moving up
	bullets: { col: number; row: number }[] = [];
	private bulletTimer: any = null;

	// fixed game area
	containerWidth = 640;
	containerHeight = 640;

	// must match the service cell size/gap
	readonly cellSize = 16;
	readonly gap = 2;

	constructor(private svc: HelloWorldGameService) {}

	ngOnInit() {
		this.generatePhrase();
		this.initTankPosition();
	}

	ngOnDestroy(): void {
		if (this.bulletTimer) clearInterval(this.bulletTimer);
	}

	generatePhrase() {
		const containerCols = this.getContainerCols();
		const containerRows = this.getContainerRows();
		const layout = this.svc.layout(this.phrase || "", containerCols, containerRows);
		this.cells = layout.cells || [];
		this.startCol = layout.startCol || 0;
		this.startRow = layout.startRow || 0;
		this.usedCols = layout.usedCols || 0;
		this.usedRows = layout.usedRows || 0;
		const unit = this.cellSize + this.gap;
		this.colOffsetPx = this.startCol * unit;
		this.rowOffsetPx = this.startRow * unit;
	}

	moveUp() {
		const newRow = Math.max(0, this.tank.row - 1);
		const upTank = this.svc.tankCellsAt(this.tank.col, newRow, this.tank.color);
		if (this.svc.isTankOverlappingPhrase(this.cells, upTank)) {
			this.resetTankToInitial();
			return;
		}
		this.tank.row = newRow;
	}

	moveDown() {
		const newRow = Math.min(this.getContainerRows() - 3, this.tank.row + 1);
		const downTank = this.svc.tankCellsAt(this.tank.col, newRow, this.tank.color);
		if (this.svc.isTankOverlappingPhrase(this.cells, downTank)) {
			this.resetTankToInitial();
			return;
		}
		this.tank.row = newRow;
	}

	moveLeft() {
		const newCol = Math.max(1, this.tank.col - 1);
		const leftTank = this.svc.tankCellsAt(newCol, this.tank.row, this.tank.color);
		if (this.svc.isTankOverlappingPhrase(this.cells, leftTank)) {
			this.resetTankToInitial();
			return;
		}
		this.tank.col = newCol;
	}

	moveRight() {
		const newCol = Math.min(this.getContainerCols() - 2, this.tank.col + 1);
		const rightTank = this.svc.tankCellsAt(newCol, this.tank.row, this.tank.color);
		if (this.svc.isTankOverlappingPhrase(this.cells, rightTank)) {
			this.resetTankToInitial();
			return;
		}
		this.tank.col = newCol;
	}

	/** Fire a bullet from the tank upward */
	shoot() {
		// bullet starts above the tank's top cell
		const startRow = this.tank.row - 1;
		if (startRow < 0) return; // no space to spawn
		this.bullets.push({ col: this.tank.col, row: startRow });
		this.startBulletTimer();
	}

	private startBulletTimer() {
		if (this.bulletTimer) return;
		this.bulletTimer = setInterval(() => {
			if (this.bullets.length === 0) {
				clearInterval(this.bulletTimer);
				this.bulletTimer = null;
				return;
			}
			const nextBullets: { col: number; row: number }[] = [];
			for (const b of this.bullets) {
				// check collision at current position
				const hit = this.cells.find((c) => c.isEnabled && c.col === b.col && c.row === b.row);
				if (hit) {
					// disable the phrase cell
					hit.isEnabled = false;
					continue; // bullet disappears
				}
				// move bullet up
				const nr = b.row - 1;
				if (nr >= 0) nextBullets.push({ col: b.col, row: nr });
			}
			this.bullets = nextBullets;
		}, 80);
	}

	private resetTankToInitial() {
		if (this.initialTank) {
			this.tank = { ...this.initialTank };
		}
	}
	// return tank bricks local positions relative to startCol/startRow
	getTankBricks() {
		const bricks = this.svc.tankCellsAt(this.tank.col, this.tank.row, this.tank.color).map((t) => ({
			containerCol: t.col,
			containerRow: t.row,
			localCol: t.col - this.startCol,
			localRow: t.row - this.startRow,
			color: t.color || this.tank.color,
		}));
		return bricks;
	}

	// tank overlap and cell computations delegated to service

	getContainerCols(): number {
		const unit = this.cellSize + this.gap;
		// include one gap to match background/grid math used elsewhere
		return Math.floor((this.containerWidth + this.gap) / unit);
	}

	getContainerRows(): number {
		const unit = this.cellSize + this.gap;
		return Math.floor((this.containerHeight + this.gap) / unit);
	}

	private initTankPosition() {
		const containerCols = this.getContainerCols();
		const containerRows = this.getContainerRows();

		const init = this.svc.computeInitialTank(
			containerCols,
			containerRows,
			this.startCol,
			this.startRow,
			this.usedCols,
			this.usedRows,
			this.tank.color,
			'bottom-center'
		);

		this.tank.col = init.col;
		this.tank.row = init.row;
		this.initialTank = { ...init };
	}

	// ranges for template iteration
	get rowRange(): number[] {
		return Array.from({ length: this.getContainerRows() }, (_, i) => i);
	}

	get colRange(): number[] {
		return Array.from({ length: this.getContainerCols() }, (_, i) => i);
	}

	// return cell data at container grid coords (col, row)
	cellAt(containerCol: number, containerRow: number): CellData | null {
		// check tank first (tank uses container coords)
		const tCells = this.svc.tankCellsAt(this.tank.col, this.tank.row, this.tank.color);
		for (const t of tCells) {
			if (t.col === containerCol && t.row === containerRow) return t;
		}

		// cells are stored in container coords, find directly
		const found = this.cells.find((c) => c.col === containerCol && c.row === containerRow && c.isEnabled);
		if (found) return { col: containerCol, row: containerRow, isEnabled: true, color: found.color };
		return { col: containerCol, row: containerRow, isEnabled: false };
	}

	// tank shape provided by service; no local getter needed

	@HostListener('window:keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		const k = event.key;

		// Space (keyboard) => shoot
		if (event.code === 'Space' || k === ' ' || k === 'Spacebar') {
			event.preventDefault();
			this.shoot();
			return;
		}

		switch (k) {
			case 'ArrowUp':
			case 'w':
			case 'W':
				event.preventDefault();
				this.moveUp();
				break;
			case 'ArrowDown':
			case 's':
			case 'S':
				event.preventDefault();
				this.moveDown();
				break;
			case 'ArrowLeft':
			case 'a':
			case 'A':
				event.preventDefault();
				this.moveLeft();
				break;
			case 'ArrowRight':
			case 'd':
			case 'D':
				event.preventDefault();
				this.moveRight();
				break;
		}
	}
}
