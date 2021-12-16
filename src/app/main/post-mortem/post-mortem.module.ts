import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";

import { ProjectControlPanelModule } from "../../shared/project-control-panel/project-control-panel.module";
import { ProjectListModule } from "../../shared/project-list/project-list.module";
import { PostMortemComponent } from "./post-mortem.component";

@NgModule({
  declarations: [PostMortemComponent],
  imports: [
    CommonModule,
    ProjectControlPanelModule,
    ProjectListModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        component: PostMortemComponent,
      },
    ]),
  ],
  exports: [PostMortemComponent],
})
export class PostMortemModule {}
