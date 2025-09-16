import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(
    private authService: AuthService, 
    private router: Router,
    ){
  
    }

    canActivate(route, state: RouterStateSnapshot) {
      if(!this.authService.isUserLoggedIn){
        this.router.navigateByUrl('/login');
          return false;
      } else {
        return true;
      }
    }  
}
