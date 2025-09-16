import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  
  allOrders: any = [];
  noOrders: boolean = false;
  deviceOffline: boolean = false;
  spinner: boolean = true;
  
  constructor(
    private WC: WoocommerceService
    ) {

     // localStorage.clear();
     // this.storage.clear();
    }

    ngOnInit(){
      this.allOrdersByCustomer();
    }

  allOrdersByCustomer(){
      let currentUserId = localStorage.getItem('currentUserId');
      this.WC.getAllOrdersByCustomer(currentUserId).subscribe((data) => {
        this.allOrders = data;
        if(this.allOrders.length == 0){
          this.spinner = false;
          this.noOrders = true;
        } else {
          this.spinner = false;
          this.noOrders = false;
        }
        //console.log('All orders: ', this.allOrders);
      });
    }

  doRefresh(event) {
    //console.log('Begin async operation');
    this.allOrdersByCustomer();
    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
