import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { Storage } from '@ionic/storage';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: any;
  spinner: boolean = false;
  cartItems: number = 0;

  baseProducts: any = [];
  cartData: any = [];
  
  constructor(    
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private WC: WoocommerceService,
    private storage: Storage,
    private CFS: CommonfunctionService,
    private cartService: CartService,
  ) { 
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let productId = paramMap.get('productId');
      this.WC.getAProduct(productId).subscribe((data) => {
        this.product = data;
      });
    });
  }

  ionViewWillEnter(){
    this.storage.remove('currentOrderData');
    this.cartService.cartItems.subscribe((value) =>{
      this.cartItems = value;
    });
    this.cartService.keepCartItemsOnRefresh();
    this.showCartItems();
  }


  addtoCart(){
    // check stock 
    if((this.product.manage_stock == true) && (this.product.stock_quantity < 1)) {
      // add prduct to cart
      //console.log('Product is out of stock');
      this.CFS.presentAlert('Oops!', 'This product is out of stock');
    } else {
        this.storage.get(`cartProduct_${this.product.id}`).then( data =>{
        if(data){
          this.spinner = false;
          this.CFS.presentAlert('Oops!', 'Item already Exist in your cart!');
        } else {
            this.spinner = false;
            this.CFS.presentToast('Item added to cart','bottom',2000);
            this.storage.set(`cartProduct_${this.product.id}`, JSON.stringify(this.product)).then(() => {
            this.cartService.updateCartPositive(); 
            console.log('cartItems : ',this.cartItems);
            if( this.cartItems > 0){
              //this.router.navigateByUrl('/checkout');
            }
          });
        }
    });
  }
  }

  showCartItems(){
  this.cartService.quantityUpdatedProducts = [];
  this.cartData = [];
  this.baseProducts = [];

  this.storage.forEach((data,key)=>{
    if(key.includes('cartProduct_')){
      let storedProducts = {};
      let parseFromStorage = data;
      //console.log('Parse From Storage:',data);
      this.cartData.push(parseFromStorage);
      storedProducts['name'] = parseFromStorage.name;
      storedProducts['product_id'] = parseFromStorage.id;
      storedProducts['price'] = Number(parseFromStorage.price);
      storedProducts['quantity'] = 1;
      this.baseProducts.push(storedProducts);
    }
    }).then(() => {
      this.cartService.quantityUpdatedProducts = this.baseProducts;
      //console.log('Cart Qt updated, Product stored in Ionic Storage: ',this.baseProducts);
    });
 }

  ngOnInit() {

  }

}
