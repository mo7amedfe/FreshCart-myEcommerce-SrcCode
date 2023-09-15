import { CartService } from './../cart.service';
import { Products } from './../products';
import { SeeMorePipe } from './../see-more.pipe';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isWishlist: boolean = false
  Products: Products[] = []


  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService) {

  }


  ngOnInit(): void {

    this._ProductsService.isInWishList_ser.next(false);

    this._ProductsService.getProducts().subscribe({
      next: (res) => {

        this.Products = res.data;
        console.log(this.Products);

      },
    })
  }



  responsee: any;

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


