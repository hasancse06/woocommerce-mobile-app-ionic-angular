import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  quantityUpdatedProducts: any;
  constructor(private storage: Storage) { }
  public cartItems = new BehaviorSubject(0);

  updateCartPositive(){
    let newItem = this.cartItems.getValue();
    this.cartItems.next(newItem+1);
  }

  updateCartNegative(){
    let newItem = this.cartItems.getValue();
    this.cartItems.next(newItem-1);
  }

  keepCartItemsOnRefresh() {
    let items = 0;
    this.storage.forEach((value,key)=>{
      if(key.includes('cartProduct_')){
        items +=1;
      }

    }).then(() =>{
      this.cartItems.next(items);
    });
  }
}
