import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCardDialogComponent } from '../project-card-dialog/project-card-dialog.component';

import { IProject, State } from '../project/project';
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {
  projects: IProject[] = [];
  state: State = {};
  @Input() defaultImagePreview = '/assets/images/projects/default/default.png';

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
  ) { }

  onSelect(project: IProject) {
    const dialogRef = this.dialog.open(ProjectCardDialogComponent, {
      width: '99%',
      data: {
        title: project.title,
        image: project.image,
        link: project.link,
        description: project.description,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.projectService.projects$
      .subscribe(projects => this.projects = projects);
    this.projectService.getState()
      .subscribe(state =>  this.state = state);
  }

}
