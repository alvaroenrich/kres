import { NgModule } from '@angular/core';
import { KResSharedModule } from '../../shared.module';
import { KResReservationRoutingModule } from './reservation-routing.module';
import { KResReservationComponent } from './reservation.component';


@NgModule({
  declarations: [KResReservationComponent],
  imports: [
    KResReservationRoutingModule,
    KResSharedModule,
  ],
})
export class KResReservationModule {}
