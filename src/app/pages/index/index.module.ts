import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EmulatorModule } from "../../components/emulator/emulator.module";
import { IndexComponent } from "./index.component";

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    EmulatorModule,
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
