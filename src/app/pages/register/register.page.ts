import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerce.service';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

username: string = '';
  email: string = '';
  password: string = '';
  repassword: string = '';
  spinner: boolean = false;
  deviceOffline: boolean = false;
  netWorkStatus: any;

  constructor( 
    private WC: WoocommerceService,
    private CFS: CommonfunctionService, 
    private platform: Platform,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  signUp(){
    this.platform.ready().then(() => {
    this.spinner = true;
    if((this.username != '') && 
    (this.password != '') && 
    (this.repassword != '') && 
    (this.password == this.repassword) && 
    (this.CFS.validateEmail(this.email))) {
      // console.log('Username: ',this.username);
      // console.log('Email: ',this.email);
      // console.log('Password: ',this.password);
    this.WC.registerCustomer(this.email,this.username,this.password).then((response) => {
      if(response['error']){
        //console.log(response['error'].code);
        this.CFS.presentToast(response['error'].message,'bottom',2000);
        this.spinner = false;
          
      } else {
        this.CFS.presentToast('Registration successful, You may login now','bottom',2000);
        this.spinner = false;
        this.router.navigateByUrl('/login');
      } 
    });
    } else {
      this.CFS.presentToast('Please fill up the forms correctly','bottom',2000);
      this.spinner = false;
    }
  });
  }

  reloadPWA(){
    window.location.reload();
  }
}
