import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectControlPanelModule } from '../../components/project-control-panel/project-control-panel.module';
import { ProjectListModule } from '../../components/project-list/project-list.module';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from '../../entities/project/project.service';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectControlPanelModule,
    ProjectListModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ProjectsComponent,
      },
    ]),
  ],
  exports: [ProjectsComponent],
  providers: [ProjectService]
})
export class ProjectsModule { }
