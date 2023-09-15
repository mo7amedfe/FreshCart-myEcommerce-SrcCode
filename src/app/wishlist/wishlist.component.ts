import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from '../products';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})


export class WishlistComponent implements OnInit {

  constructor(private _HttpClient: HttpClient, private _ProductsService: ProductsService, private _ToastrService: ToastrService) {
   }
  Products: Products[] = []
  response: any;
  ngOnInit(): void {
    this._ProductsService.isInWishList_ser.next(true)

    this._ProductsService.WishList().subscribe({


      next: (res) => {
        // console.log(this._ProductsService.isInWishList.getValue());

        this.Products = res.data;
      }

    })
  }
  removeFromWishList(id: string) {
    this._ProductsService.removeFromWishList(id).subscribe({
      next: (res) => {
        this.response = res
        this.ngOnInit()
      }
      , error: () => { }
      , complete: () => {
        this._ToastrService.success(this.response.message, this.response.status)
      }
    })
  }
}
