import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ContactsComponent,
      },
    ]),
  ],
  exports: [ContactsComponent]
})
export class ContactsModule { }
