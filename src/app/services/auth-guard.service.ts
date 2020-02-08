import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  public jwtHelper = new JwtHelperService();

  constructor(
    @Inject('TOKENNAME') private tokenName: string,
    private main: MainService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem(this.tokenName);
    try {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.main.logout();
        return false;
      } else {
        return true;
      }
    } catch (err) {
      this.main.logout();
      return false;
    }
  }

}
