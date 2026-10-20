import { Injectable } from "@angular/core";
import { CellData } from "./hello-world-game.types";
import { HelloWorldGameUtils } from "./hello-world-game.utils";

@Injectable({ providedIn: "root" })
export class HelloWorldGameService {
	generate(phrase: string): CellData[] {
		return HelloWorldGameUtils.generate(phrase);
	}

	layout(phrase: string, containerCols: number, containerRows: number) {
		return HelloWorldGameUtils.layout(phrase, containerCols, containerRows);
	}

	tankCellsAt(col: number, row: number, color = "#ff3b30"): CellData[] {
		return HelloWorldGameUtils.tankCellsAt(col, row, color);
	}

	isTankOverlappingPhrase(cells: CellData[], tankCells: CellData[]): boolean {
		return HelloWorldGameUtils.isTankOverlappingPhrase(cells, tankCells);
	}

	computeInitialTank(
		containerCols: number,
		containerRows: number,
		startCol: number,
		startRow: number,
		usedCols: number,
		usedRows: number,
		color = "#ff3b30",
		mode: "bottom-center" | "inside-used" = "bottom-center",
	) {
		return HelloWorldGameUtils.computeInitialTank(
			containerCols,
			containerRows,
			startCol,
			startRow,
			usedCols,
			usedRows,
			color,
			mode,
		);
	}
}
