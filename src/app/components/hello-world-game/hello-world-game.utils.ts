export interface CellData {
	col: number;
	row: number;
	isEnabled: boolean;
	color?: string;
}

export class HelloWorldGameUtils {
	static generate(phrase: string): CellData[] {
		return phrase
			.split("")
			.map((char, index) => ({
				col: index,
				row: 0,
				isEnabled: true,
				color: "#00ff00",
			}));
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
		const usedCols = cells.length;
		const usedRows = 1;
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
		// Tank is 3x3 with center bottom missing for "cannon"
		const tankCells: CellData[] = [];
		const tankSize = 3;

		for (let tCol = 0; tCol < tankSize; tCol++) {
			for (let tRow = 0; tRow < tankSize; tRow++) {
				// Skip center bottom for cannon
				if (tCol === 1 && tRow === 2) continue;

				tankCells.push({
					col: col + tCol,
					row: row + tRow,
					isEnabled: true,
					color,
				});
			}
		}

		return tankCells;
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
		const tankSize = 3;

		if (mode === "bottom-center") {
			const col = startCol + Math.floor(usedCols / 2);
			const row = containerRows - tankSize;
			return { col, row, color };
		}

		// inside-used mode
		const col = startCol;
		const row = startRow + usedRows - tankSize;
		return { col, row, color };
	}
}
