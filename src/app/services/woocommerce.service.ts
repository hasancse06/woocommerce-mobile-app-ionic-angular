import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {


  currentUserData: any;
  currentSessionUser: any;
  isUserAthenticated: boolean = false;
  isUserPassChanged: boolean = false;
  wooComUserData: any;
  categories: any;
  products: any;
  product: any;
  paymentGateways: any;
  orderResp: any;
  customerData: any;
  allOrders: any;
  order: any;
  apiUrl: string;
  siteURL = 'https://demo.hasan.online/github';
  jwtPart = '/wp-json/jwt-auth/v1/token';
  userPart = '/wp-json/wp/v2/users/';
  woocomPart: string = '/wp-json/wc/v3/';
  //consumerKey: string = 'ck_woocoomerce_api_consumer_key';
  //consumerSecret: string = 'cs_woocoomerce_api_secret_key';

  consumerKey: string = 'ck_960b34d917a42340ea64e443e7902daee81243f2';
  consumerSecret: string = 'cs_40f62c2909d93fb0d9a5dd082a4fd95976595655';

  constructor(private http: HttpClient) { }

    registerCustomer(email, username, password){
      let headers = new HttpHeaders ({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let credentials = `username=${username}&email=${email}&password=${password}`;
      this.apiUrl = `${this.siteURL}${this.woocomPart}customers?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
      //console.log('API URL for register a customer: ', this.apiUrl);
  
      return new Promise ((resolve) => {
        this.http.post(this.apiUrl, credentials, {headers}).subscribe((successResp) => {
            resolve(successResp);
        },
        (errorResp) => {
          resolve(errorResp);
          //console.log('errorResp:',errorResp);
        }
        )
      });
    }

    getAllStoreProducts(){
      this.apiUrl = `${this.siteURL}${this.woocomPart}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&per_page=100`;
      //console.log('API URL for all store products: ',this.apiUrl);
      this.products = this.http.get(this.apiUrl);
      return this.products;
    }

    getAllCategories(){
      this.apiUrl = `${this.siteURL}${this.woocomPart}products/categories?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&per_page=100`;
      //console.log('API URL for all categories: ',this.apiUrl);
      this.categories = this.http.get(this.apiUrl);
      return this.categories;
    }
  
    getProductsByCategory(catId){
      this.apiUrl = `${this.siteURL}${this.woocomPart}products?category=${catId}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&per_page=100`;
      //console.log('API URL Products of a category: ',this.apiUrl);
      this.products = this.http.get(this.apiUrl);
      return this.products;
    }

    getAProduct(productId){
      this.apiUrl = `${this.siteURL}${this.woocomPart}products/${productId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&status=publish`;
      //console.log('Homepage Products API URL: ',this.apiUrl);
      this.product = this.http.get(this.apiUrl);
      return this.product;
    }

  getAllPaymentGateWays(){
    this.apiUrl = `${this.siteURL}${this.woocomPart}payment_gateways?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    //console.log('API URL for all paymnet gateways',this.apiUrl);
    return new Promise((resolve) => {
      this.paymentGateways = this.http.get(this.apiUrl);
      this.paymentGateways.subscribe((data) => {
        resolve(data);
      });
    });
  }

  getCustomerData(id){
    this.apiUrl = `${this.siteURL}${this.woocomPart}customers/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    //console.log('API url for retrive customer: ', this.apiUrl);
    this.customerData = this.http.get(this.apiUrl); 
    return this.customerData;
  }

  placeOrder(orderDataObj){
    let headers = new HttpHeaders ({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

  let orderData = this.JSON_to_URLEncoded(orderDataObj);
  this.apiUrl = `${this.siteURL}${this.woocomPart}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
  //console.log('API URL for order: ', this.apiUrl);
    return new Promise ((resolve) => {
      this.orderResp = this.http.post(this.apiUrl,orderData, {headers});
      this.orderResp.subscribe((successResp) => {
        resolve(successResp);
      },
  
      (errorResp) =>{
        resolve(errorResp);
      }
      );
  });

}

  getAllOrdersByCustomer(currentUserId){
    this.apiUrl = `${this.siteURL}${this.woocomPart}orders?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&per_page=100`;
    //console.log('Get all orders by customer API URL: ',this.apiUrl);
    this.allOrders = this.http.get(this.apiUrl);
    return this.allOrders;
  }

  getAnOrder(orderId){
    this.apiUrl = `${this.siteURL}${this.woocomPart}orders/${orderId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    //console.log('Get all orders by customer API URL: ',this.apiUrl);
    this.order = this.http.get(this.apiUrl);
    return this.order;
  }


// convert javascript object to x-www-form-urlencoded format
JSON_to_URLEncoded(element, key?, list?) {
  var list = list || [];
  if (typeof element == "object") {
    for (var idx in element)
      this.JSON_to_URLEncoded(
        element[idx],
        key ? key + "[" + idx + "]" : idx,
        list
      );
  } else {
    list.push(key + "=" + encodeURIComponent(element));
  }
  return list.join("&");
}

}
