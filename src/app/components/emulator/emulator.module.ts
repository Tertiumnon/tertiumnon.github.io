import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmulatorComponent } from './emulator.component';

@NgModule({
  declarations: [EmulatorComponent],
  imports: [CommonModule],
  exports: [EmulatorComponent],
})
export class EmulatorModule {}
