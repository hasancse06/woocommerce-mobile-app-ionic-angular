import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.page.html',
  styleUrls: ['./ordersuccess.page.scss'],
})
export class OrdersuccessPage implements OnInit {

  currentOrderData: any;
  constructor(private storage: Storage) { 

  }
  ngOnInit() {
    this.storage.get('currentOrderData').then((data)=>{
      this.currentOrderData = data;
      //console.log('CurrentOrder: ',this.currentOrderData);
      if(this.currentOrderData){
      }
    });
  }

}