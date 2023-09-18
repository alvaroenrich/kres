import { NgModule } from '@angular/core';
import { KResSharedModule } from '../../shared.module';
import { KResHomeRoutingModule } from './home-routing.module';
import { KResHomeComponent } from './home.component';


@NgModule({
  declarations: [KResHomeComponent],
  imports: [
    KResSharedModule,
    KResHomeRoutingModule,
  ],
})
export class KResHomeModule {}
