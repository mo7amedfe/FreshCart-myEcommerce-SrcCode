import { count } from 'rxjs';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {

  }
  isloading: boolean = false;
  cartId: string = ''
  cartItems: any[] = []
  getCartResponse: any
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartId = res.data._id
        this.getCartResponse = res.data
        this.cartItems = res.data.products        
        this._CartService.cartId=res.data._id;
      }
    })


  }


  UpdateCartQuantity(id: string, count: number) {
    this.isloading = true;
    this._CartService.UpdateCartQuantity(id, count).subscribe({
      next: (res) => {

        this.ngOnInit()

        this.isloading = false
      }
    })
  }
  removeItem(id: string) {
    this.isloading = true
    this._CartService.removeItem(id).subscribe({
      next: () => {
        this._CartService.numOfCartItems.next(this._CartService.numOfCartItems.getValue() - 1);
        this.ngOnInit()
        this.isloading = false
      }
    })
  }


}
