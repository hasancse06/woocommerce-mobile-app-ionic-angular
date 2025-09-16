import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any = [];
  spinner: boolean = false;
  noData: boolean = false;
  
  constructor(
    private WC: WoocommerceService,
    ) { 
    }

  ngOnInit() {
    this.spinner = true;
    this.allCategories();
  }

  allCategories(){    
    this.WC.getAllCategories().subscribe((data) => {
      this.categories = data;
      if(this.categories.length == 0){
        this.noData = true;
      }
      this.spinner = false;
      //console.log('All Categories: ',this.categories);
  });
}

  doRefresh(event) {
    //console.log('Begin async operation');
    this.allCategories();
    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
