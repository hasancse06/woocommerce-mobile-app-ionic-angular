import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

 /* use this varibale so that page.html works perfectly without showing any error */


  orderForm: FormGroup;

  currentUserId: any;
  customerData: any;

  spinner: boolean = false;
  disableBtn: boolean = false;

  isPaymentGatewaySelected: boolean = false;
  paymentGatewayId: any;
  paymentGatewayTitle: any;
  allPaymentGateways: any;
  allActivePaymentGateways: any = [];
  baseProducts: any = [];
  cartData: any = [];
  totalPrice: number = 0;

  billingAddress = {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    phone: "",
    email: ""
  };

  billingFromValidated: boolean = false;


  constructor(
    private WC: WoocommerceService, 
    private storage: Storage,
    private cartService: CartService,
    private platform: Platform,
    private router: Router,
    private CFS: CommonfunctionService,
        private domSanitizer: DomSanitizer,
    ) { 

      this.currentUserId = localStorage.getItem('currentUserId');

      this.WC.getCustomerData(this.currentUserId).subscribe((data)=>{
        this.customerData = data;
        //console.log('customerData: ',this.customerData);
        this.orderForm = new FormGroup({
          billing_first_name: new FormControl(this.customerData.billing.first_name, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_last_name: new FormControl(this.customerData.billing.last_name, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_address_1: new FormControl(this.customerData.billing.address_1, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_address_2: new FormControl(this.customerData.billing.address_2, {
            updateOn: 'blur'
          }),
          billing_country: new FormControl(this.customerData.billing.country, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_city: new FormControl(this.customerData.billing.city, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_state: new FormControl(this.customerData.billing.state, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_postcode: new FormControl(this.customerData.billing.postcode, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_phone: new FormControl(this.customerData.billing.phone, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          billing_email: new FormControl(this.customerData.billing.email, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
      });
    }


  ionViewWillEnter(){
    if(this.cartService.quantityUpdatedProducts){
      this.cartService.quantityUpdatedProducts.forEach((updatedProducts) =>{
        let newCartData = {}; 
        //console.log('Qty updated products:',updatedProducts);
        newCartData['product_id'] = updatedProducts.product_id;
        newCartData['price'] = updatedProducts.price;
        newCartData['quantity'] = updatedProducts.quantity;
        this.baseProducts.push(newCartData);
        //console.log('Product after qty changed: ',this.baseProducts);
        this.totalCheckoutAmount();
      });
    } else {
      this.storage.forEach((data) => {
        let storedProducts = {};
        let parseFromStorage = JSON.parse(data);
        //console.log('Parse From Storage:',parseFromStorage);
        this.cartData.push(parseFromStorage);
        storedProducts['product_id'] = parseFromStorage.id;
        storedProducts['price'] = parseInt(parseFromStorage.price);
        storedProducts['quantity'] = 1;
        this.baseProducts.push(storedProducts);
        //console.log('Product stored in Ionic Storage: ',this.baseProducts);
        this.totalCheckoutAmount();
      }).then(() => {
        
      });
    }
  }

  ngOnInit() {
    this.WC.getAllPaymentGateWays().then((gateways) => {
      this.allPaymentGateways = gateways;
      //console.log('All Payment Gatways', this.allPaymentGateways);
      for ( let paymentGateway of this.allPaymentGateways){
          if(paymentGateway.enabled == true) {
            this.allActivePaymentGateways.push(paymentGateway);
          }
      }
      //console.log('All Allowed Payment Gateway: ',this.allActivePaymentGateways);
    });

  }

  totalCheckoutAmount(){
    this.totalPrice = 0;
    let tempPrice = 0;
    this.baseProducts.forEach((product) => {
      tempPrice = product.price * product.quantity;
      this.totalPrice += tempPrice;
    });
    return this.totalPrice;
  }

  choosePaymentGateway(gateway){
    //console.log('gateway: ',gateway);
    this.isPaymentGatewaySelected = true;
    this.paymentGatewayId = gateway.detail.value;
    if(this.paymentGatewayId == 'cod'){
     this.paymentGatewayTitle = 'Cash On Delivery'
    }
    //console.log('Gateway ID', this.paymentGatewayId);
    //console.log('Gateway Title', this.paymentGatewayTitle);
  }

  completePurchase(){

    let billing_first_name = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_first_name);
    let billing_last_name = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_last_name);
    let billing_address_1 = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_address_1);
    let billing_address_2 = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_address_2);
    let billing_country = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_country);
    let billing_city = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_city);
    let billing_state = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_state);
    let billing_postcode = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_postcode);
    let billing_phone = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_phone);
    let billing_email = this.domSanitizer.bypassSecurityTrustHtml(this.orderForm.value.billing_email);

    let orderObj = {};
    orderObj['payment_method'] = this.paymentGatewayId;
    orderObj['payment_method_title'] = this.paymentGatewayTitle;
    orderObj['customer_id'] = this.currentUserId;
    
    this.platform.ready().then(() => {
      this.billingAddress = {
        first_name: billing_first_name['changingThisBreaksApplicationSecurity'],
        last_name: billing_last_name['changingThisBreaksApplicationSecurity'],
        address_1: billing_address_1['changingThisBreaksApplicationSecurity'],
        address_2: billing_address_2['changingThisBreaksApplicationSecurity'],
        city: billing_city['changingThisBreaksApplicationSecurity'],
        state: billing_state['changingThisBreaksApplicationSecurity'],
        postcode: billing_postcode ['changingThisBreaksApplicationSecurity'],
        country: billing_country['changingThisBreaksApplicationSecurity'],
        phone: billing_phone['changingThisBreaksApplicationSecurity'],
        email: billing_email['changingThisBreaksApplicationSecurity'],
      }

      if(!this.billingAddress.first_name) {
        this.CFS.presentAlert('Oops!','Please complete billing First Name');
        this.spinner = false;
      } else if (!this.billingAddress.last_name){
        this.CFS.presentAlert('Oops!','Please complete billing Last Name');
        this.spinner = false;
      } else if (!this.billingAddress.address_1){
        this.CFS.presentAlert('Oops!','Please complete billing Street Address 1');
        this.spinner = false;
      } else if (!this.billingAddress.city){
        this.CFS.presentAlert('Oops!','Please complete billing Town / District');
        this.spinner = false;
      } else if (!this.billingAddress.state){
        this.CFS.presentAlert('Oops!','Please complete billing Island / State');
        this.spinner = false;
      } else if (!this.billingAddress.postcode){
        this.CFS.presentAlert('Oops!','Please complete billing Postcode');
        this.spinner = false;
      } else if (!this.billingAddress.country){
        this.CFS.presentAlert('Oops!','Please complete billing Country / Region');
        this.spinner = false;
      } else if (!this.billingAddress.phone){
        this.CFS.presentAlert('Oops!','Please complete billing Phone');
        this.spinner = false;
      } else if(!this.CFS.validateEmail(this.billingAddress.email)) {
        this.CFS.presentAlert('Oops!','Please complete billing Email');
        this.spinner = false;
      } else {
          this.billingFromValidated = true;
      }

      orderObj['billing'] = this.billingAddress;
      orderObj['line_items'] = this.baseProducts;
   
      if(this.billingFromValidated == true) {
        //console.log('Billing Details: ',orderObj['billing']);
          this.WC.placeOrder(orderObj).then((orderRespData) => {
          //console.log('Order Response for new order: ',orderRespData);
           this.spinner = true;
            if(orderRespData['error']){
              // disable submit button
              this.disableBtn = false;
              this.spinner = false;
              this.CFS.presentToast(orderRespData['error'].message,'bottom',5000);
            } else {
              this.CFS.presentToast('Order Placed successfully!','bottom',5000);
              this.storage.set('currentOrderData', orderRespData);
              this.disableBtn = false;
              this.spinner = false;
                // remove items from cart
                this.storage.forEach((value,key) => {
                if(key.includes('cartProduct_')){
                  //let parseFromStorage = JSON.parse(value);
                  this.storage.remove(key);
                }
              });
              this.router.navigateByUrl('/ordersuccess');
            }
          });
        
      } else {
          this.disableBtn = false;
          this.spinner = false;
      }
    });
  }

}
