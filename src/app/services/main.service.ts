import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

// import 'bootstrap-notify';
// declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public jwtHelper = new JwtHelperService();
  public getDcodedToken = new EventEmitter();

  constructor(
    @Inject('APIURL') private apiUrl: string,
    private router: Router,
    public http: HttpClient
  ) { }

  get(path: string) {
    const url: string = `${this.apiUrl}/${path}`;
    return this.http.get(url).toPromise();
  }

  post(path: string, data: any) {
    const url: string = `${this.apiUrl}/${path}`;
    return this.http.post(url, data).toPromise();
  }

  getUrl(url: string) {
    return this.http.get(url).toPromise();
  }

  postUrl(url: string, data: any) {
    return this.http.post(url, data).toPromise();
  }

  in_array(str: any, array: Array<any>): boolean {
    return array.indexOf(str) >= 0;
  }

}
