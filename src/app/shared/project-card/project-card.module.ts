import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { ProjectCardComponent } from './project-card.component';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [ProjectCardComponent]
})
export class ProjectCardModule { }
