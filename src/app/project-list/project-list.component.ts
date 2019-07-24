import { Component, OnInit } from '@angular/core';

import PROJECTS from '../mock-projects';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {

  projects = PROJECTS;

  constructor() { }

  onSelect(project) {
    console.log(project);
  }

  ngOnInit() {
  }

}
