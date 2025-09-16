import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderdetailsPageRoutingModule } from './orderdetails-routing.module';

import { OrderdetailsPage } from './orderdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderdetailsPageRoutingModule
  ],
  declarations: [OrderdetailsPage]
})
export class OrderdetailsPageModule {}
