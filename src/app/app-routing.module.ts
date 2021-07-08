import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./main/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./main/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  { path: '**', redirectTo: '' },
];

const routerOptions: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
