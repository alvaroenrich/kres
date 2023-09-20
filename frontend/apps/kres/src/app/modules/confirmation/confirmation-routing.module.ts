import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { KResConfirmationComponent } from "./confirmation.component";

export const KRES_CONFIRMATION_ROUTES: Routes = [
  {
    path: '',
    component: KResConfirmationComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(KRES_CONFIRMATION_ROUTES)],
  exports: [RouterModule],
})
export class KResConfirmationRoutingModule {}