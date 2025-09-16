import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

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
    this.productsByCategory();
  }

  productsByCategory(){
      this.activatedRoute.paramMap.subscribe((paramMap) => {
      const catId = paramMap.get('catId');
      //console.log('Category ID found: ', catId);
        this.WC.getProductsByCategory(catId).subscribe((data) => {
        this.products = data;
        this.spinner = false;
        if(this.products.length == 0){
          this.noData = true;
        }
        //console.log('Products by Category: ',this.products);
      });
    });
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    this.productsByCategory();
    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
