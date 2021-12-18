import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { interval } from "rxjs";
import { scan } from "rxjs/operators";

import { markForRemoval, updateDrops, updateMatrix } from "./matrix";
import { render } from "./matrix-renderer";

@Component({
  selector: "app-matrix",
  templateUrl: "./matrix.component.html",
  styleUrls: ["./matrix.component.less"],
})
export class MatrixComponent implements OnInit {
  @ViewChild("matrixElementRef") matrixElement: ElementRef<HTMLElement> | undefined = undefined;

  ngOnInit(): void {
    interval(300)
      .pipe(
        scan<number, any[]>((matrix) => {
          if (!this.matrixElement) throw new Error("Matrix element doesn't exist");
          return markForRemoval(matrix), updateDrops(matrix), updateMatrix(matrix, this.matrixElement.nativeElement);
        }, [])
      )
      .subscribe(render);
  }
}
