import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule,
  MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NavComponent } from './nav/nav.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProjectsComponent,
    ProjectCardComponent,
    ProjectListComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule, 
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
  ],
  exports: [
    MatButtonModule, MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
