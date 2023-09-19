import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const KRES_APP_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservation',
      },
      {
        path: 'reservation',
        loadChildren: () => import('./modules/reservation/reservation.module').then((m) => m.KResReservationModule),
      },
      {
        path: 'confirmation',
        loadChildren: () => import('./modules/confirmation/confirmation.module').then((m) => m.KResConfirmationModule),
      },
      {
        path: 'success',
        loadChildren: () => import('./modules/success/success.module').then((m) => m.KResSuccessModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(KRES_APP_ROUTES)],
  exports: [RouterModule],
})
export class KResAppRoutingModule {}
