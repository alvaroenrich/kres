import { NgModule } from '@angular/core';
import { KResSharedModule } from '../../shared.module';
import { KResSuccessRoutingModule } from './success-routing.module';
import { KResSuccessComponent } from './success.component';


@NgModule({
  declarations: [KResSuccessComponent],
  imports: [
    KResSharedModule,
    KResSuccessRoutingModule,
  ],
})
export class KResSuccessModule {}
