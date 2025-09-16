import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersuccessPage } from './ordersuccess.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersuccessPageRoutingModule {}
