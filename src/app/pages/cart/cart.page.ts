import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  /* use below 4 variables at beginning so that cart page html works properly */
  cartData:any = [];
  baseProducts:any = [];
  totalPrice: number = 0;
  show: boolean = true;


  constructor(private storage: Storage, private cartService: CartService) { }


  ionViewWillEnter() {
    // remove the current order saved in local storage
    this.storage.remove('currentOrderData');

    this.storage.forEach((data) => {
      let storedProducts = {};
      let parseFromStorage = JSON.parse(data);
      this.cartData.push(parseFromStorage);
      storedProducts['product_id'] = parseFromStorage.id;
      storedProducts['price'] = parseInt(parseFromStorage.price);
      storedProducts['quantity'] = 1;
      this.baseProducts.push(storedProducts);

    }).then(() => {
      //console.log('Product stored in Ionic Storage: ',this.baseProducts);
    });
  }

  ngOnInit() {

  }

  changeCartItemQty(currentItem){
    this.baseProducts.forEach((productToUpdate) => {
      if(productToUpdate.product_id == currentItem.product_id){
        productToUpdate.quantity = parseInt(currentItem.quantity);
      }
    });
    this.cartService.quantityUpdatedProducts = this.baseProducts;
    //console.log('Changed Quantity on cart',this.cartService.quantityUpdatedProducts);
  }

  removeFromCart(index,item){
    this.cartData.splice(index,1);
    let pId = item.id;
    this.storage.remove(`product_${pId}`);
  }

  calculatePrice(){
    this.totalPrice = 0;
    let tempPrice = 0;
    this.baseProducts.forEach((product) => {
      tempPrice = product.price * product.quantity;
      this.totalPrice += tempPrice;
    });
    return this.totalPrice;
  }

}
