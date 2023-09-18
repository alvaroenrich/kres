import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { KResSuccessComponent } from "./success.component";

export const KRES_SUCCESS_ROUTES: Routes = [
  {
    path: '',
    component: KResSuccessComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(KRES_SUCCESS_ROUTES)],
  exports: [RouterModule],
})
export class KResSuccessRoutingModule {}