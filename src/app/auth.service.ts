import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})




export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  is_Login = new BehaviorSubject(null);

  userData() {
    let localStorageToken: any = localStorage.getItem('eCommerce')
    let decoded: any = jwtDecode(localStorageToken)
    this.is_Login.next(localStorageToken)
    return decoded
  }
  register(data: FormGroup): Observable<any> {

    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)

  }
  login(data: FormGroup): Observable<any> {

    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)

  }
  logout() {
    localStorage.removeItem('eCommerce')
    this.is_Login.next(null);
    this._Router.navigate(['/signin'])

  }
 
}
