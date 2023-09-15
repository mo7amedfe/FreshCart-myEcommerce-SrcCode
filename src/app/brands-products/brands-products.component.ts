import { CartService } from './../cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../products';

@Component({
  selector: 'app-brands-products',
  templateUrl: './brands-products.component.html',
  styleUrls: ['./brands-products.component.css']
})
export class BrandsProductsComponent implements OnInit {
  BrandID: any = this._ActivatedRoute.snapshot.params[`id`]
  Products: Products[] = []
  newres: Products[] = []
  msg: any

  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getProducts()
  }
  responsee: any;
  isWishlist: boolean = false;
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


  getProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (this.BrandID == res.data[i].brand._id) {
            this.newres.push(res.data[i]);
          }
        }
        this.Products = this.newres;

        if (this.Products.length === 0) {
          this.msg = 'Sorry..No available products for this brand now..';
        } else {
          this.msg = '';
        }
        console.log(this.Products);

      },
    });
  }


}
