import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HelpersComponent } from './components/helpers/helpers.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ProjectCardDialogModule } from './components/project-card-dialog/project-card-dialog.module';
import { TopMenuModule } from './components/top-menu/top-menu.module';

@NgModule({
  declarations: [AppComponent, OrderByPipe, HelpersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ProjectCardDialogModule,
    TopMenuModule,
    FooterModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
