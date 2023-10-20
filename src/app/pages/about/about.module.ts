import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./about.component";
import { EmulatorModule } from "../../components/emulator/emulator.module";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        component: AboutComponent,
      },
    ]),
    EmulatorModule,
  ],
  exports: [
    AboutComponent
  ],
})
export class AboutModule { }
