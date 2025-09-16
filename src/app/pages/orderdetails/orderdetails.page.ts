import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {

  order: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private WC: WoocommerceService

    ) {
      
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let orderId = paramMap.get('orderId');
      this.WC.getAnOrder(orderId).subscribe((data) => {
        this.order = data;
        //console.log('Order details: ', this.order);
      });
    });
  }

// handle special character in title
 decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

}
