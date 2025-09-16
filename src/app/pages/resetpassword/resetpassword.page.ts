import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  spinner: boolean = false;
  disableBtn: boolean = false;
    email = '';
    constructor(
      private platform: Platform,
      private auth: AuthService,
      private CFS: CommonfunctionService,
      private router: Router,
      ) { }
  
    ngOnInit() {
    }
  
    resetPassword(){
      this.platform.ready().then(() => {
        this.spinner = true;
        this.disableBtn = true;
        if(this.CFS.validateEmail(this.email)) {
          //console.log('Email:',this.email);
          // now do necessary task in resetUserPassword function in auth service
          this.auth.resetUserPassword(this.email).then((response) => {
            //console.log('Email Response', response );
  
            if(response == true){
              this.CFS.presentToast (
                'Please check your inbox, a password reset email has been sent to your email',
                'bottom',
                2000
              );
              // then  redirect to login page so that user can login now
              this.router.navigateByUrl('/login');
              this.spinner = false;
              this.disableBtn = false;
              setTimeout(() => {
                window.location.reload();
              },1500);
            } else {
              this.CFS.presentToast (
                'There is no account attached to given email address, Please enter correct one!',
                'bottom',
                3000
              );
              this.spinner = false;
              this.disableBtn = false;
            }
  
          });
          // if resetUserPassword function is successful and it sends password reset link in email
          // then present a success toast
          
        } else {
          this.CFS.presentToast (
            'Please enter a valid email address',
            'bottom',
            2000
          );
          this.spinner = false;
          this.disableBtn = false;
        }
      });
    }
  
  }
  