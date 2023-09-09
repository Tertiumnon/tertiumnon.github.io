import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EmulatorModule } from "../../components/emulator/emulator.module";
import { MatrixModule } from "../../components/matrix/matrix.module";
import { IndexComponent } from "./index.component";

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    EmulatorModule,
    MatrixModule,
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        component: IndexComponent,
      },
    ]),
  ],
  exports: [IndexComponent],
})
export class IndexModule {}
