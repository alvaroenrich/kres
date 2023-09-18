import { NgModule } from '@angular/core';
import { KResSharedModule } from '../../shared.module';
import { KResReservationRoutingModule } from './reservation-routing.module';
import { KResReservationComponent } from './reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KResReservationComponent],
  imports: [
    KResReservationRoutingModule,
    KResSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class KResReservationModule {}
