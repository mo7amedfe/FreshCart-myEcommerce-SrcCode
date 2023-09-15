import { CartService } from './../cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  proID: any = this._ActivatedRoute.snapshot.params[`id`]

  constructor(private _CartService: CartService, private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService) { }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: { items: 1 }
    },
    nav: false
  }

  proDetailes: Products = {
    _id: '',
    title: '',
    slug: '',
    description: '',
    quantity: 0,
    price: 0,
    priceAfterDiscount:0,
    imageCover: '',
    images: [],
    category: {
      _id: '',
      name: '',
      slug: '',
      image: ''
    },
    ratingsAverage: 0
  };

  ngOnInit(): void {
    
    console.log(this.proID);

    this._ProductsService.productDetailes(this.proID).subscribe({
      next: (res) => {
        this.proDetailes = res.data;
        console.log(this.proDetailes);

      }
    })

  }
  responsee: any;
  addToWishList() {

    if (localStorage.getItem('eCommerce') == null || localStorage.getItem('eCommerce') == '') {
      alert('please login first')
    } else {

      this._ProductsService.addToWishList(this.proID).subscribe({
        next: (res) => {
          this.responsee = res

        },
        error: () => { },
        complete: () => {

          this._ToastrService.success(this.responsee.message, this.responsee.status)


        }
      })
    }
  }

  addCartResponse: any;

  addItemToCart() {

    this._CartService.addToCart(this.proID).subscribe({
      next: (res) => {
        this.addCartResponse = res;
        console.log(this.addCartResponse);
        this._CartService.ngOnInit()
        this._CartService.numOfCartItems.next(this._CartService.numOfCartItems.getValue())


      }, error: (err: Error) => {
        console.log(err);

      },
      complete: () => {

        this._ToastrService.success(this.addCartResponse.message)
      }
    }
    )

  }
}
