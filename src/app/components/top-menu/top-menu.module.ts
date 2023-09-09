import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { NavModule } from '../nav/nav.module';
import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  imports: [CommonModule, RouterModule, NavModule, MatToolbarModule],
  exports: [TopMenuComponent],
})
export class TopMenuModule {}
