import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule } from '@angular/router';

import { ProjectControlPanelModule } from '../../components/project-control-panel/project-control-panel.module';
import { ProjectListModule } from '../../components/project-list/project-list.module';
import { ProjectsComponent } from './projects.component';

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
