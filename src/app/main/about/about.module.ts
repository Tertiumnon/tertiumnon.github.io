import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AboutComponent } from "./about.component";


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AboutComponent,
      },
    ]),
  ],
  exports: [AboutComponent]
})
export class AboutModule { }
