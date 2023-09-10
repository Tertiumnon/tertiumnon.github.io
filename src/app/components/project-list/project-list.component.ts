import { Component, Input } from '@angular/core';

import { IProject } from '../../entities/project/project.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  @Input() defaultImagePreview = '/assets/images/projects/default/default.png';
  @Input() projects: IProject[] = [];

  constructor(private router: Router) { }

  onProjectClick(project: IProject) {
    // this.router.navigate(['projects', project.name]);
  }
}
