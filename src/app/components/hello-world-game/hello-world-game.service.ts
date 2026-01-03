import { Injectable } from "@angular/core";

export interface CellData {
	col: number; // grid column index
	row: number; // grid row index
	isEnabled: boolean;
	color?: string;
}

@Injectable({ providedIn: "root" })
export class HelloWorldGameService {
	/**
	 * Generate an array of grid `CellData` representing the provided phrase.
	 * Each character is mapped into a 5xN pixel pattern; cells indicate `isEnabled`.
	 */
	generate(phrase: string): CellData[] {
		if (!phrase) return [];

		// Simple pixel patterns for a few letters. '1' indicates a filled cell.
		const patterns: Record<string, string[]> = {
			H: ["101", "101", "111", "101", "101"],
			E: ["111", "100", "111", "100", "111"],
			L: ["100", "100", "100", "100", "111"],
			O: ["111", "101", "101", "101", "111"],
			X: ["101", "010", "010", "010", "101"],
			"?": ["1", "1", "1", "1", "1"],
		};

		const cellSize = 16; // px per cell (kept for reference)
		const gap = 2; // px gap between cells (kept for reference)
		const charGapCols = 1; // empty column between characters

		const cells: CellData[] = [];
		let cursorCol = 0;

		for (const rawCh of phrase) {
			const ch = rawCh === ' ' ? ' ' : rawCh.toUpperCase();

			if (ch === ' ') {
				// advance by one empty column (space)
				cursorCol += charGapCols + 1;
				continue;
			}

			const pattern = patterns[ch] || patterns['?'];
			const rows = pattern.length;
			const cols = pattern[0].length;

			// deterministic color for the character
			const hue = (ch.charCodeAt(0) * 37) % 360;
			const color = `hsl(${hue} 70% 50%)`;

			for (let r = 0; r < rows; r++) {
				const row = pattern[r];
				for (let c = 0; c < cols; c++) {
					const isEnabled = row[c] === '1';
					const col = cursorCol + c;
					const rowIdx = r;

					cells.push({ col, row: rowIdx, isEnabled, color: isEnabled ? color : undefined });
				}
			}

			// advance cursor by character width (cols) plus a gap column
			cursorCol += cols + charGapCols;
		}

		return cells;
	}

	/**
	 * Layout the phrase into container grid coordinates.
	 * Returns cells mapped to container coords and layout metadata.
	 */
	layout(phrase: string, containerCols: number, containerRows: number) {
		const raw = this.generate(phrase);
		if (!raw || raw.length === 0) return { cells: [], startCol: 0, startRow: 0, usedCols: 0, usedRows: 0 };

		let minCol = Infinity;
		let minRow = Infinity;
		let maxCol = -Infinity;
		let maxRow = -Infinity;
		for (const c of raw) {
			if (!c.isEnabled) continue;
			minCol = Math.min(minCol, c.col);
			minRow = Math.min(minRow, c.row);
			maxCol = Math.max(maxCol, c.col);
			maxRow = Math.max(maxRow, c.row);
		}

		if (!isFinite(minCol)) return { cells: [], startCol: 0, startRow: 0, usedCols: 0, usedRows: 0 };

		const usedCols = maxCol - minCol + 1;
		const usedRows = maxRow - minRow + 1;

		const startCol = Math.max(0, Math.floor((containerCols - usedCols) / 2));
		const startRow = Math.max(0, Math.floor((containerRows - usedRows) / 2));

		const cells = raw.map((c) => ({
			col: c.col - minCol + startCol,
			row: c.row - minRow + startRow,
			isEnabled: c.isEnabled,
			color: c.color,
		}));

		return { cells, startCol, startRow, usedCols, usedRows };
	}

	/** Return the 3x3 tank cells (as CellData) for a center at (col,row) */
	tankCellsAt(col: number, row: number, color = '#ff3b30'): CellData[] {
		return [
			{ col: col, row: row, isEnabled: true, color },
			{ col: col - 1, row: row + 1, isEnabled: true, color },
			{ col: col, row: row + 1, isEnabled: true, color },
			{ col: col + 1, row: row + 1, isEnabled: true, color },
			{ col: col - 1, row: row + 2, isEnabled: true, color },
			{ col: col, row: row + 2, isEnabled: true, color },
			{ col: col + 1, row: row + 2, isEnabled: true, color },
		];
	}

	/** Check whether any of the provided tank cells overlap enabled phrase cells */
	isTankOverlappingPhrase(cells: CellData[], tankCells: CellData[]): boolean {
		for (const t of tankCells) {
			if (cells.find((c) => c.isEnabled && c.col === t.col && c.row === t.row)) return true;
		}
		return false;
	}

	/** Compute an initial tank position. mode: 'bottom-center' or 'inside-used' */
	computeInitialTank(containerCols: number, containerRows: number, startCol: number, startRow: number, usedCols: number, usedRows: number, color = '#ff3b30', mode: 'bottom-center' | 'inside-used' = 'bottom-center') {
		const tMinCol = 1;
		const tMaxCol = Math.max(tMinCol, containerCols - 2);
		const tMinRow = 0;
		const tMaxRow = Math.max(tMinRow, containerRows - 3);

		let desiredCol: number;
		let desiredRow: number;
		if (mode === 'inside-used' && usedCols > 0 && usedRows > 0) {
			desiredCol = startCol + Math.floor(usedCols / 2);
			const verticalSpace = Math.max(0, usedRows - 3);
			desiredRow = startRow + Math.floor(verticalSpace / 2);
		} else {
			desiredCol = Math.floor(containerCols / 2);
			desiredRow = tMaxRow;
		}

		const col = Math.min(Math.max(desiredCol, tMinCol), tMaxCol);
		const row = Math.min(Math.max(desiredRow, tMinRow), tMaxRow);
		return { col, row, color };
	}
}
