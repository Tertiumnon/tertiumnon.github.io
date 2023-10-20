import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NavModule } from "../nav/nav.module";
import { HeaderComponent } from "./header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, NavModule],
  exports: [HeaderComponent],
})
export class HeaderModule { }
