import { Component, Input } from '@angular/core';

import { IProject } from '../../entities/project/project.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  @Input() defaultImagePreview = '/assets/images/projects/default/default.png';
  @Input() projects: IProject[] = [];
}