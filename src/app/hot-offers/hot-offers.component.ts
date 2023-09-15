import { CartService } from './../cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../products';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-offers',
  templateUrl: './hot-offers.component.html',
  styleUrls: ['./hot-offers.component.css']
})
export class HotOffersComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _ToastrService: ToastrService, private _CartService: CartService) { }
  Products: Products[] = []
  isWishlist: boolean = false

  ngOnInit(): void {

    this._ProductsService.getProducts().subscribe({
      next: (res) => {

        for (let i = 0; i < res.data.length; i++) {

          if (res.data[i].priceAfterDiscount) {
            this.Products.push(res.data[i]);

          }
        }
        console.log(this.Products);

      },
    })
  }
  responsee: any
  addToWishList(id: any) {

    if (localStorage.getItem('eCommerce') == null || localStorage.getItem('eCommerce') == '') {
      alert('please login first')
    } else {

      this.isWishlist = !this.isWishlist;
      // console.log(id);
      this._ProductsService.addToWishList(id).subscribe({
        next: (res) => {
          this.responsee = res

        },
        error: () => { },
        complete: () => {
          // console.log('done');
          this._ToastrService.success(this.responsee.message, this.responsee.status)
        }
      }
      )
    }
  }

  addCartResponse: any;
  addItemToCart(id: any) {

    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.addCartResponse = res
        this._CartService.ngOnInit()
        // console.log(this.addCartResponse);

        this._CartService.numOfCartItems.next(this._CartService.numOfCartItems.getValue())

      },
      error: () => { },
      complete: () => {

        this._ToastrService.success(this.addCartResponse.message)
      }
    }
    )

  }
}
