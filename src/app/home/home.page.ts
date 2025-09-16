import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any = [];
  spinner: boolean = false;
  noData: boolean = false;
 
 
   constructor(
     private WC: WoocommerceService,
     private activatedRoute: ActivatedRoute
     ) { 
     }
 
   ngOnInit() {
     this.spinner = true;
     this.allProductsHome();
   }
 
   allProductsHome(){
    this.WC.getAllStoreProducts().subscribe((data) => {
        this.products = data;
        this.spinner = false;
        if(this.products.length == 0){
          this.noData = true;
        }
        //console.log('Products by Category: ',this.products);
      });
   }
 
   doRefresh(event) {
     //console.log('Begin async operation');
     this.allProductsHome();
     setTimeout(() => {
       //console.log('Async operation has ended');
       event.target.complete();
     }, 2000);
   }
 
 }