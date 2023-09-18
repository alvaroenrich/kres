import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const KRES_APP_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.KResHomeModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(KRES_APP_ROUTES)],
  exports: [RouterModule],
})
export class KResAppRoutingModule {}
