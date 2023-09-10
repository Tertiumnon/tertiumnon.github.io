import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HelpersComponent } from './components/helpers/helpers.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ProjectModule } from './pages/project/project.module';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [AppComponent, OrderByPipe, HelpersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProjectModule,
    HeaderModule,
    FooterModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
