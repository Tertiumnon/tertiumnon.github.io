import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProjectCardDialogComponent } from './project-card-dialog.component';

@NgModule({
  declarations: [ProjectCardDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [ProjectCardDialogComponent],
})
export class ProjectCardDialogModule {}
