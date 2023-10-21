import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ProjectListModule } from "../../components/project-list/project-list.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectService } from "../../entities/project/project.service";
import { ProjectControlPanelComponent } from "../../components/project-control-panel/project-control-panel.component";

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectControlPanelComponent,
    ProjectListModule,
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        component: ProjectsComponent,
      },
    ]),
  ],
  exports: [ProjectsComponent],
  providers: [ProjectService]
})
export class ProjectsModule { }
