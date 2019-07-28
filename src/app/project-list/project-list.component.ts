import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProjectCardDialogComponent } from '../project-card-dialog/project-card-dialog.component';

import PROJECTS from '../mock-projects';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {

  projects = PROJECTS;

  constructor(public dialog: MatDialog) {
    this.projects.sort((a, b) => {
      if (a.year < b.year) {
        return 1;
      } else if (a.year > b.year) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  onSelect(project) {
    // console.log(project);
    const dialogRef = this.dialog.open(ProjectCardDialogComponent, {
      width: '99%',
      data: {title: project.title, image: project.image}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  ngOnInit() {
  }

}
