import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

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
