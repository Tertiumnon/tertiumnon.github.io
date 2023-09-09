import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProjectControlPanelComponent } from './project-control-panel.component';

@NgModule({
  declarations: [ProjectControlPanelComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ProjectControlPanelComponent]
})
export class ProjectControlPanelModule { }
