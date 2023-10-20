import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProjectCardModule } from "../project-card/project-card.module";
import { ProjectListComponent } from "./project-list.component";

@NgModule({
  declarations: [ProjectListComponent],
  imports: [CommonModule, ProjectCardModule],
  exports: [ProjectListComponent],
})
export class ProjectListModule {}
