import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { CommonfunctionService } from 'src/app/services/commonfunction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Product Categories',
      url: '/categories',
      icon: 'folder-open'
    },
  ];
  
  currentUserDisplayName: any;
  private subsCription: Subscription;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private CFS: CommonfunctionService,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();

    // subscribe to home component messages
    this.subsCription = this.CFS.getDisplayName().subscribe( displayName => {
      if (displayName) {
        this.currentUserDisplayName = displayName;
        this.currentUserDisplayName = this.currentUserDisplayName.display_name;
        //console.log('Current Display Name: ', this.currentUserDisplayName);
      } else {
        // clear messages when empty message received
        this.currentUserDisplayName = '';
      }
    });

    if(localStorage.getItem('display_name')){
      this.currentUserDisplayName = {
        'display_name': localStorage.getItem('display_name')
      }
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut(){
    localStorage.clear();
    this.storage.clear();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

  ngOnInit() {

  }
}
