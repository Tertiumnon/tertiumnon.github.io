import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { EmulatorComponent } from "./emulator.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [EmulatorComponent],
  imports: [CommonModule, FormsModule],
  exports: [EmulatorComponent],
})
export class EmulatorModule {}
