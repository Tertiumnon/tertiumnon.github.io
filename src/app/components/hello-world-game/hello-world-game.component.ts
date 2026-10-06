import {
	ChangeDetectorRef,
	Component,
	HostListener,
	OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HelloWorldGameService } from "./hello-world-game.service";
import { CellData } from "./hello-world-game.types";
import { TANK_HEIGHT, TANK_WIDTH } from "./hello-world-game.utils";

interface PlayerRecord {
	name: string;
	score: number;
	blocks: number;
	timeSeconds: number;
}

const RECORDS_KEY = "hello-world-arcade-records";
const SEED_RECORDS: PlayerRecord[] = [
	{ name: "MARIO", score: 8945, blocks: 88, timeSeconds: 145 },
	{ name: "LINK", score: 8552, blocks: 84, timeSeconds: 152 },
	{ name: "SAMUS", score: 8066, blocks: 79, timeSeconds: 166 },
	{ name: "MEGA", score: 7659, blocks: 75, timeSeconds: 159 },
	{ name: "PAC-MAN", score: 7147, blocks: 70, timeSeconds: 147 },
	{ name: "KIRBY", score: 6938, blocks: 68, timeSeconds: 138 },
];

@Component({
	selector: "app-hello-world-game",
	templateUrl: "./hello-world-game.component.html",
	styleUrls: ["./hello-world-game.component.css"],
	standalone: true,
	imports: [CommonModule],
})
export class HelloWorldGameComponent {
	phrase = "Hello World";
	cells: CellData[] = [];

	colOffsetPx = 0;
	rowOffsetPx = 0;
	// used area (in local cell counts) and start offsets (in container cols/rows)
	usedCols = 0;
	usedRows = 0;
	startCol = 0;
	startRow = 0;
	targetOffsetX = 0;
	targetOffsetY = 0;
	targetDirection: -1 | 1 = 1;
	gameOver = false;
	gameWon = false;
	playerName = "PLAYER 1";
	destroyedBlocks = 0;
	survivalSeconds = 0;
	records: PlayerRecord[] = [...SEED_RECORDS];
	private runStartedAt = 0;
	// tank state (grid coords)
	tank = { col: 0, row: 0, color: "#ff3b30" };

	// bullets: each bullet is a single-cell projectile moving up
	bullets: { col: number; row: number }[] = [];
	private bulletTimer: ReturnType<typeof setInterval> | undefined;
	private movementTimer: ReturnType<typeof setInterval> | undefined;
	private targetTimer: ReturnType<typeof setInterval> | undefined;
	private targetSteps = 0;
	private readonly pressedDirections = new Set<"up" | "down" | "left" | "right">();

	// fixed game area
	containerWidth = 640;
	containerHeight = 640;

	// must match the service cell size/gap
	readonly cellSize = 9;
	readonly gap = 1;

	constructor(
		private svc: HelloWorldGameService,
		private changeDetector: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.records = this.loadRecords();
		this.beginRun();
		this.generatePhrase();
		this.initTankPosition();
		this.startTargetTimer();
	}

	ngOnDestroy(): void {
		if (this.bulletTimer) clearInterval(this.bulletTimer);
		if (this.movementTimer) clearInterval(this.movementTimer);
		if (this.targetTimer) clearInterval(this.targetTimer);
	}

	restart(): void {
		if (this.bulletTimer) clearInterval(this.bulletTimer);
		this.bulletTimer = undefined;
		this.bullets = [];
		this.gameOver = false;
		this.gameWon = false;
		this.beginRun();
		this.targetOffsetX = 0;
		this.targetOffsetY = 0;
		this.targetDirection = 1;
		this.targetSteps = 0;
		this.pressedDirections.clear();
		if (this.movementTimer) clearInterval(this.movementTimer);
		this.movementTimer = undefined;
		this.generatePhrase();
		this.initTankPosition();
		this.startTargetTimer();
	}

	get elapsedSeconds(): number {
		if (this.gameOver) return this.survivalSeconds;
		return this.runStartedAt ? Math.floor((Date.now() - this.runStartedAt) / 1000) : 0;
	}

	get score(): number {
		return this.destroyedBlocks * 100 + this.elapsedSeconds;
	}

	formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
		const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
		return `${minutes}:${remainingSeconds}`;
	}

	updatePlayerName(event: Event): void {
		this.playerName = (event.target as HTMLInputElement).value
			.toUpperCase()
			.replace(/[^A-Z0-9 _-]/g, "")
			.slice(0, 10);
	}

	private beginRun(): void {
		this.destroyedBlocks = 0;
		this.survivalSeconds = 0;
		this.runStartedAt = Date.now();
	}

	private loadRecords(): PlayerRecord[] {
		if (typeof window === "undefined") return [...SEED_RECORDS];
		try {
			const saved: unknown = JSON.parse(window.localStorage.getItem(RECORDS_KEY) ?? "null");
			if (Array.isArray(saved)) {
				const valid = saved.filter((entry): entry is PlayerRecord => {
					if (!entry || typeof entry !== "object") return false;
					const record = entry as Partial<PlayerRecord>;
					return typeof record.name === "string" &&
						Number.isFinite(record.score) &&
						Number.isFinite(record.blocks) &&
						Number.isFinite(record.timeSeconds);
				});
				return valid.length ? this.sortRecords(valid).slice(0, 10) : [...SEED_RECORDS];
			}
		} catch {
			// Use the built-in arcade table when browser storage is unavailable or invalid.
		}
		return [...SEED_RECORDS];
	}

	private sortRecords(records: PlayerRecord[]): PlayerRecord[] {
		return [...records].sort((a, b) =>
			b.score - a.score || b.blocks - a.blocks || b.timeSeconds - a.timeSeconds,
		);
	}

	private saveRecord(): void {
		const record: PlayerRecord = {
			name: this.playerName.trim() || "PLAYER 1",
			score: this.score,
			blocks: this.destroyedBlocks,
			timeSeconds: this.survivalSeconds,
		};
		this.records = this.sortRecords([...this.records, record]).slice(0, 10);
		try {
			window.localStorage.setItem(RECORDS_KEY, JSON.stringify(this.records));
		} catch {
			// Keep the current-session leaderboard if storage is unavailable.
		}
	}

	generatePhrase() {
		const containerCols = this.getContainerCols();
		const containerRows = this.getContainerRows();
		const layout = this.svc.layout(
			this.phrase || "",
			containerCols,
			containerRows,
		);
		const topOffset = 1 - (layout.startRow || 0);
		this.cells = (layout.cells || []).map((cell) => ({
			...cell,
			row: cell.row + topOffset,
		}));
		this.startCol = layout.startCol || 0;
		this.startRow = 1;
		this.usedCols = layout.usedCols || 0;
		this.usedRows = layout.usedRows || 0;
		const unit = this.cellSize + this.gap;
		this.colOffsetPx = this.startCol * unit;
		this.rowOffsetPx = this.startRow * unit;
	}

	moveUp() {
		const newRow = Math.max(0, this.tank.row - 1);
		const upTank = this.svc.tankCellsAt(this.tank.col, newRow, this.tank.color);
		if (this.isTankHittingPhrase(upTank)) {
			this.endGame();
			return;
		}
		this.tank.row = newRow;
	}

	moveDown() {
		const newRow = Math.min(
			this.getContainerRows() - TANK_HEIGHT,
			this.tank.row + 1,
		);
		const downTank = this.svc.tankCellsAt(
			this.tank.col,
			newRow,
			this.tank.color,
		);
		if (this.isTankHittingPhrase(downTank)) {
			this.endGame();
			return;
		}
		this.tank.row = newRow;
	}

	moveLeft() {
		const newCol = Math.max(0, this.tank.col - 1);
		const leftTank = this.svc.tankCellsAt(
			newCol,
			this.tank.row,
			this.tank.color,
		);
		if (this.isTankHittingPhrase(leftTank)) {
			this.endGame();
			return;
		}
		this.tank.col = newCol;
	}

	moveRight() {
		const newCol = Math.min(
			this.getContainerCols() - TANK_WIDTH,
			this.tank.col + 1,
		);
		const rightTank = this.svc.tankCellsAt(
			newCol,
			this.tank.row,
			this.tank.color,
		);
		if (this.isTankHittingPhrase(rightTank)) {
			this.endGame();
			return;
		}
		this.tank.col = newCol;
	}

	/** Fire a bullet from the tank upward */
	shoot() {
		if (this.gameOver) return;
		// Fire from the center cannon, just above its muzzle.
		const startRow = this.tank.row - 1;
		if (startRow < 0) return; // no space to spawn
		this.bullets.push({ col: this.tank.col + 1, row: startRow });
		this.startBulletTimer();
	}

	private startBulletTimer() {
		if (this.bulletTimer) return;
		this.bulletTimer = setInterval(() => {
			if (this.bullets.length === 0) {
				clearInterval(this.bulletTimer);
				this.bulletTimer = undefined;
				return;
			}
			const nextBullets: { col: number; row: number }[] = [];
			for (const b of this.bullets) {
				// check collision at current position
				const hit = this.cells.find(
					(c) =>
						c.isEnabled &&
						c.col + this.targetOffsetX === b.col &&
						c.row + this.targetOffsetY === b.row,
				);
				if (hit) {
					// disable the phrase cell
					hit.isEnabled = false;
					this.destroyedBlocks++;
					if (!this.cells.some((cell) => cell.isEnabled)) {
						this.endGame(true);
						return;
					}
					continue; // bullet disappears
				}
				// move bullet up
				const nr = b.row - 1;
				if (nr >= 0) nextBullets.push({ col: b.col, row: nr });
			}
			this.bullets = nextBullets;
			this.changeDetector.markForCheck();
		}, 80);
	}

	private startMovementTimer() {
		if (this.movementTimer) return;
		this.movementTimer = setInterval(() => {
			if (this.gameOver) return;
			const direction = this.pressedDirections.values().next().value;
			if (!direction) {
				clearInterval(this.movementTimer);
				this.movementTimer = undefined;
				return;
			}
			this.moveInDirection(direction);
			this.changeDetector.markForCheck();
		}, 120);
	}

	private startTargetTimer() {
		if (this.targetTimer) clearInterval(this.targetTimer);
		this.targetTimer = setInterval(() => {
			if (this.gameOver) return;

			this.targetSteps++;
			if (this.targetSteps >= 8) {
				this.targetOffsetY++;
				this.targetSteps = 0;
			}

			const minOffset = -this.startCol;
			const maxOffset = this.getContainerCols() - this.startCol - this.usedCols;
			const nextOffset = this.targetOffsetX + this.targetDirection;
			if (nextOffset < minOffset || nextOffset > maxOffset) {
				this.targetDirection = this.targetDirection === 1 ? -1 : 1;
			} else {
				this.targetOffsetX = nextOffset;
			}

			if (
				this.isTankHittingPhrase(this.svc.tankCellsAt(
					this.tank.col,
					this.tank.row,
					this.tank.color,
				)) ||
				this.startRow + this.targetOffsetY + this.usedRows >= this.getContainerRows()
			) {
				this.endGame();
			}
			this.changeDetector.markForCheck();
		}, 160);
	}

	private getMovingPhraseCells(): CellData[] {
		return this.cells.map((cell) => ({
			...cell,
			col: cell.col + this.targetOffsetX,
			row: cell.row + this.targetOffsetY,
		}));
	}

	private isTankHittingPhrase(tankCells: CellData[]): boolean {
		return this.svc.isTankOverlappingPhrase(this.getMovingPhraseCells(), tankCells);
	}

	private endGame(won = false) {
		if (this.gameOver) return;
		this.survivalSeconds = this.elapsedSeconds;
		this.gameOver = true;
		this.gameWon = won;
		this.saveRecord();
		this.pressedDirections.clear();
		this.bullets = [];
		if (this.targetTimer) clearInterval(this.targetTimer);
		if (this.movementTimer) clearInterval(this.movementTimer);
		if (this.bulletTimer) clearInterval(this.bulletTimer);
		this.targetTimer = undefined;
		this.movementTimer = undefined;
		this.bulletTimer = undefined;
	}

	private moveInDirection(direction: "up" | "down" | "left" | "right") {
		if (this.gameOver) return;
		switch (direction) {
			case "up": this.moveUp(); break;
			case "down": this.moveDown(); break;
			case "left": this.moveLeft(); break;
			case "right": this.moveRight(); break;
		}
	}

	private directionForKey(key: string): "up" | "down" | "left" | "right" | undefined {
		switch (key.toLowerCase()) {
			case "arrowup":
			case "w": return "up";
			case "arrowdown": return "down";
			case "arrowleft":
			case "a": return "left";
			case "arrowright":
			case "d": return "right";
			default: return undefined;
		}
	}

	// return tank bricks local positions relative to startCol/startRow
	getTankBricks() {
		const bricks = this.svc
			.tankCellsAt(this.tank.col, this.tank.row, this.tank.color)
			.map((t) => ({
				containerCol: t.col,
				containerRow: t.row,
				localCol: t.col - this.startCol,
				localRow: t.row - this.startRow,
				color: t.color || this.tank.color,
				isCannon: t.col === this.tank.col + 1 && t.row === this.tank.row,
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
			"bottom-center",
		);

		this.tank.col = init.col;
		this.tank.row = init.row;
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
		const tCells = this.svc.tankCellsAt(
			this.tank.col,
			this.tank.row,
			this.tank.color,
		);
		for (const t of tCells) {
			if (t.col === containerCol && t.row === containerRow) return t;
		}

		// cells are stored in container coords, find directly
		const found = this.cells.find(
			(c) =>
				c.col + this.targetOffsetX === containerCol &&
				c.row + this.targetOffsetY === containerRow &&
				c.isEnabled,
		);
		if (found)
			return {
				col: containerCol,
				row: containerRow,
				isEnabled: true,
				color: found.color,
			};
		return { col: containerCol, row: containerRow, isEnabled: false };
	}

	// tank shape provided by service; no local getter needed

	@HostListener("window:keydown", ["$event"])
	onKeyDown(event: KeyboardEvent) {
		if (this.gameOver) return;
		const k = event.key;

		// Space or S => shoot. The down direction uses ArrowDown.
		if (event.code === "Space" || k === " " || k === "Spacebar" || k.toLowerCase() === "s") {
			event.preventDefault();
			if (!event.repeat) this.shoot();
			return;
		}

		const direction = this.directionForKey(k);
		if (direction) {
			event.preventDefault();
			if (!this.pressedDirections.has(direction)) {
				this.pressedDirections.add(direction);
				this.moveInDirection(direction);
				if (!this.gameOver) this.startMovementTimer();
			}
		}
	}

	@HostListener("window:keyup", ["$event"])
	onKeyUp(event: KeyboardEvent) {
		const direction = this.directionForKey(event.key);
		if (!direction) return;
		event.preventDefault();
		this.pressedDirections.delete(direction);
	}

	@HostListener("window:blur")
	onWindowBlur() {
		this.pressedDirections.clear();
		if (this.movementTimer) clearInterval(this.movementTimer);
		this.movementTimer = undefined;
	}
}
