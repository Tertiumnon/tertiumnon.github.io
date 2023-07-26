import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProjectCardDialogComponent } from '../project-card-dialog/project-card-dialog.component';
import { IProject } from '../../entities/project/project.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less'],
})
export class ProjectListComponent {
  @Input() defaultImagePreview = '/assets/images/projects/default/default.png';
  @Input() projects: IProject[] = [];

  constructor(public dialog: MatDialog) {}

  onSelect(project: IProject) {
    const dialogRef = this.dialog.open(ProjectCardDialogComponent, {
      width: '99%',
      data: {
        title: project.title,
        image: project.image,
        link: project.link,
        description: project.description,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
