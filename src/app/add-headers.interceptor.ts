import { LoaderService } from './loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor {

  constructor(private _LoaderService:LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._LoaderService.show()
    let x = request.clone({
      headers: request.headers.set('token', ' ' + localStorage.getItem('eCommerce'))
    })
    return next.handle(x).pipe(
      finalize(() => this._LoaderService.hide()));
  }
}
