import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentUserData: any;
  email = '';
  password = '';
  spinner: boolean = false;
  disableBtn: boolean = false;
  currentUserId: any;

  constructor(
    private platform: Platform,
    private auth: AuthService,
    private CFS: CommonfunctionService,
    private router: Router

  ) { 

  }

  ionViewWillEnter(){
    if(localStorage.getItem('currentUserId')) {
      this.CFS.presentToast('You are logged in...!','bottom',2000);
      this.router.navigateByUrl('/updateaccount');
    }
  }

  ngOnInit() {

  }

  signIn(){
    this.spinner = true;
    this.disableBtn = true;
    this.platform.ready().then(() => {
      if((this.CFS.validateEmail(this.email)) && (this.password) != ''){
        this.auth.login(this.email, this.password).then(responseData => {
          //console.log('Login Response:', responseData);
          if(responseData['token']){
            // CUSTOM HACK decode current user ID from token
            let jwt = responseData['token'];
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            this.currentUserId = decodedJwtData.data.user['id'];

            localStorage.setItem('access_token', responseData['token']);
            localStorage.setItem('display_name', responseData['user_display_name']);
            this.CFS.setDisplayName(responseData['user_display_name']);
            localStorage.setItem('currentUserId', this.currentUserId);
            localStorage.setItem('currentUserEmail', this.email.toLowerCase());
            //console.log('Current User ID: ',this.currentUserId);
            this.CFS.presentToast('You are logged in...!','bottom',2000);
            this.router.navigateByUrl('/home');
            setTimeout(() => {
              window.location.reload();
            },1500);
            
          } else {
            this.CFS.presentToast(
              'Your Email or Password is not right..!',
              'bottom',
              3000
            );
            this.disableBtn = false;
            this.spinner = false;
          }
        });
      } else {
        this.CFS.presentToast (
          'Please enter a valid email and password!',
          'bottom',
          3000
        );
        this.disableBtn = false;
        this.spinner = false;
      }
    });
  }
  
  reloadPWA(){
    window.location.reload();
  }
}

