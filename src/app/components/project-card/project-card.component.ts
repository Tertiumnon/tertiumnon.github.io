import { Component, Input } from '@angular/core';
import { IProject } from '../../entities/project/project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.less']
})
export class ProjectCardComponent {
  @Input() project?: IProject;
}