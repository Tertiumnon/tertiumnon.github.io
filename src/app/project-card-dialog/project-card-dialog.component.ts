import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  image: string;
}

@Component({
  selector: 'app-project-card-dialog',
  templateUrl: './project-card-dialog.component.html',
  styleUrls: ['./project-card-dialog.component.less']
})
export class ProjectCardDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProjectCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
