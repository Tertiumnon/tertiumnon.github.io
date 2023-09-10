import { Component } from '@angular/core'

import { Router } from '@angular/router'
import { IProject } from '../../entities/project/project.interface';
import { ProjectService } from '../../entities/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent {
  project: IProject | null = this.projectService.get('cheatsheets');

  constructor (private router: Router, private projectService: ProjectService) { }

  onNoClick (): void {
    this.router.navigate(['', 'projects']);
  }
}
