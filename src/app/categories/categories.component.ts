import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../products';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CategoryService: CategoryService, private _CartService: CartService, private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute) {

  }
  catID: string = ''
  Products: Products[] = []
  isWishlist: boolean = false
 

  ngOnInit(): void {
    this._ProductsService.isInWishList_ser.next(false);
    this.getId()

  }

  getId() {
    this._ActivatedRoute.paramMap.subscribe((res: any) => {
      this.catID = res.params.id;
      this.getProducts(this.catID);
      console.log(this.catID)
    });
  }
  getProducts(catID: string) {

    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.Products = []
        console.log(res);
        console.log(res.data);
        let j = 0;
        for (let i = 0; i < res.data.length; i++) {

          if (res.data[i].category._id == catID || res.data[i].subcategory[0]._id == catID) {
            this.Products[j] = res.data[i];
            j++;
          }

        }

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
