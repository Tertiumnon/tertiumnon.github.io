import { Component, OnInit } from '@angular/core';

import { IProject } from '../../entities/project/project.interface';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe(
      (projects) => (this.projects = projects || [])
    );
  }
}
