import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  numOfCartItems = new BehaviorSubject(0);
  cartId: string = ''
  constructor(private _HttpClient: HttpClient) {

    this.ngOnInit()
  }

  ngOnInit(): void {

    this.getCart().subscribe({
      next: (res) => {
        this.numOfCartItems.next(res.numOfCartItems);
        this.cartId = res.data._id;
        // console.log(this.cartId);

      }
    })
  }






  addToCart(id: string): Observable<any> {


    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id })

  }

  UpdateCartQuantity(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count })

  }
  getCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')

  }
  removeItem(id: string): Observable<any> {

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)

  }

  checkout(id: string, data: FormGroup): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, { shippingAddress: data })
  }

  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }


}
