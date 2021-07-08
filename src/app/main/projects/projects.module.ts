import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectControlPanelModule } from '../../shared/project-control-panel/project-control-panel.module';
import { ProjectListModule } from '../../shared/project-list/project-list.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectControlPanelModule,
    ProjectListModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ProjectsComponent,
      },
    ]),
  ],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
