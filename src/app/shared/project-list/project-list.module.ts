import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProjectCardModule } from '../project-card/project-card.module';
import { ProjectListComponent } from './project-list.component';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProjectCardModule
  ],
  exports: [ProjectListComponent]
})
export class ProjectListModule { }
