import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { KResHomeComponent } from "./home.component";

export const KRES_HOME_ROUTES: Routes = [
  {
    path: '',
    component: KResHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservation',
      },
      {
        path: 'reservation',
        loadChildren: () => import('../reservation/reservation.module').then((m) => m.KResReservationModule),
      },
      {
        path: 'confirmation',
        loadChildren: () => import('../confirmation/confirmation.module').then((m) => m.KResConfirmationModule),
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(KRES_HOME_ROUTES)],
  exports: [RouterModule],
})
export class KResHomeRoutingModule {}