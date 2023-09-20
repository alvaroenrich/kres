import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { KResReservationComponent } from "./reservation.component";

export const KRES_RESERVATION_ROUTES: Routes = [
  {
    path: '',
    component: KResReservationComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(KRES_RESERVATION_ROUTES)],
  exports: [RouterModule],
})
export class KResReservationRoutingModule {}