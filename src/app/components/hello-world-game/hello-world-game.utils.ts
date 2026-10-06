import { CellData } from "./hello-world-game.types";

export const TANK_WIDTH = 3;
export const TANK_HEIGHT = 3;
const GLYPH_WIDTH = 3;
const LETTER_SPACING = 1;
const WORD_SPACING = 2;

const PIXEL_GLYPHS: Record<string, string[]> = {
	H: ["101", "101", "111", "101", "101"],
	E: ["111", "100", "110", "100", "111"],
	L: ["100", "100", "100", "100", "111"],
	O: ["111", "101", "101", "101", "111"],
	W: ["101", "101", "111", "111", "101"],
	R: ["110", "101", "110", "101", "101"],
	D: ["110", "101", "101", "101", "110"],
	"?": ["110", "001", "010", "000", "010"],
};

export class HelloWorldGameUtils {
	static generate(phrase: string): CellData[] {
		const cells: CellData[] = [];
		let cursor = 0;

		for (const character of phrase.toUpperCase()) {
			if (/\s/.test(character)) {
				cursor += WORD_SPACING;
				continue;
			}

			const glyph = PIXEL_GLYPHS[character] ?? PIXEL_GLYPHS["?"];
			for (let row = 0; row < glyph.length; row++) {
				for (let col = 0; col < GLYPH_WIDTH; col++) {
					if (glyph[row][col] === "1") {
						cells.push({
							col: cursor + col,
							row,
							isEnabled: true,
							color: "#00ff00",
						});
					}
				}
			}
			cursor += GLYPH_WIDTH + LETTER_SPACING;
		}

		return cells;
	}

	static layout(
		phrase: string,
		containerCols: number,
		containerRows: number
	): {
		cells: CellData[];
		startCol: number;
		startRow: number;
		usedCols: number;
		usedRows: number;
	} {
		const cells = this.generate(phrase);
		const usedCols = cells.reduce((width, cell) => Math.max(width, cell.col + 1), 0);
		const usedRows = cells.reduce((height, cell) => Math.max(height, cell.row + 1), 0);
		const startCol = Math.floor((containerCols - usedCols) / 2);
		const startRow = Math.floor((containerRows - usedRows) / 2);

		const adjustedCells = cells.map((cell) => ({
			...cell,
			col: cell.col + startCol,
			row: cell.row + startRow,
		}));

		return {
			cells: adjustedCells,
			startCol,
			startRow,
			usedCols,
			usedRows,
		};
	}

	static tankCellsAt(col: number, row: number, color = "#ff3b30"): CellData[] {
		// Facing up: cannon, turret/body, then continuous tracks.
		return [
			{ col: col + 1, row, isEnabled: true, color },
			{ col, row: row + 1, isEnabled: true, color },
			{ col: col + 1, row: row + 1, isEnabled: true, color },
			{ col: col + 2, row: row + 1, isEnabled: true, color },
			{ col, row: row + 2, isEnabled: true, color },
			{ col: col + 1, row: row + 2, isEnabled: true, color },
			{ col: col + 2, row: row + 2, isEnabled: true, color },
		];
	}

	static isTankOverlappingPhrase(
		cells: CellData[],
		tankCells: CellData[]
	): boolean {
		for (const tankCell of tankCells) {
			const overlappingCell = cells.find(
				(cell) =>
					cell.col === tankCell.col &&
					cell.row === tankCell.row &&
					cell.isEnabled
			);
			if (overlappingCell) {
				return true;
			}
		}
		return false;
	}

	static computeInitialTank(
		containerCols: number,
		containerRows: number,
		startCol: number,
		startRow: number,
		usedCols: number,
		usedRows: number,
		color = "#ff3b30",
		mode: "bottom-center" | "inside-used" = "bottom-center"
	): { col: number; row: number; color: string } {
		if (mode === "bottom-center") {
			const col = Math.max(
				0,
				Math.min(
					containerCols - TANK_WIDTH,
					startCol + Math.floor((usedCols - TANK_WIDTH) / 2),
				),
			);
			const row = containerRows - TANK_HEIGHT;
			return { col, row, color };
		}

		// inside-used mode
		const col = startCol;
		const row = startRow + usedRows - TANK_HEIGHT;
		return { col, row, color };
	}
}
