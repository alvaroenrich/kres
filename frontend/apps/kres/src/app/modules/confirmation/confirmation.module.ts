import { NgModule } from '@angular/core';
import { KResSharedModule } from '../../shared.module';
import { KResConfirmationRoutingModule } from './confirmation-routing.module';
import { KResConfirmationComponent } from './confirmation.component';


@NgModule({
  declarations: [KResConfirmationComponent],
  imports: [
    KResSharedModule,
    KResConfirmationRoutingModule,
  ],
})
export class KResConfirmationModule {}
