import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProjectCardDialog } from './project-card-dialog';

@Component({
  selector: 'app-project-card-dialog',
  templateUrl: './project-card-dialog.component.html',
  styleUrls: ['./project-card-dialog.component.less'],
})
export class ProjectCardDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ProjectCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectCardDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
