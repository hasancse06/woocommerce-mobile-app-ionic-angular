import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersuccessPageRoutingModule } from './ordersuccess-routing.module';

import { OrdersuccessPage } from './ordersuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersuccessPageRoutingModule
  ],
  declarations: [OrdersuccessPage]
})
export class OrdersuccessPageModule {}
