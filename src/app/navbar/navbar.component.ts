import { CategoriesComponent } from './../categories/categories.component';
import { category } from './../products';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ordersRes: any;
  isLogin: boolean = false;
  IDs: any = []
  subcategories: any = []
  Products: Products[] = []
  categories: any = [];
  numOfCartItems: number = 0
  isInWishList: boolean = false;

  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService, private _Router: Router, private _CartService: CartService, private _CategoryService: CategoryService) {
    this._CartService.numOfCartItems.subscribe({
      next: () => {

        this.numOfCartItems = _CartService.numOfCartItems.getValue();
      }
    })
    this._AuthService.is_Login.subscribe({

      next: () => {
        if (_AuthService.is_Login.getValue() == null || _AuthService.is_Login.getValue() == '') {
          this.isLogin = false
        } else {
          this.isLogin = true;
        }
      }
    })

    if (localStorage.getItem('eCommerce') == null || localStorage.getItem('eCommerce') == '') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }

  }

  ngOnInit(): void {
    this._ProductsService.isInWishList_ser.subscribe({
      next: () => {

        this.isInWishList = this._ProductsService.isInWishList_ser.getValue()

        this._ProductsService.isWishListFun()

      }
    })

    this._ProductsService.getProducts().subscribe({
      next: (res) => {

        this.Products = res.data;

      },
    })

    this._CartService.getUserOrders(this._AuthService.userData().id).subscribe({
      next: (res) => {

        this.ordersRes = res
        this.yourordersNavenable()

      }
    })
    this._ProductsService.categories().subscribe({
      next: (res) => {
        this.categories = res.data



        for (let i = 0; i < this.categories.length; i++) {

          this.IDs[i] = this.categories[i]._id
        }

        for (let i = 0; i < this.IDs.length; i++) {

          this._ProductsService.subCategories(this.IDs[i]).subscribe({
            next: (res) => {
              this.subcategories[i] = res.data
            }
          })

        }
        // console.log(this.subcategories);

      }
    })

  }

  subcategory: any = []

  subcatShow(index: any) {
    this.subcategory = this.subcategories[index]

  }



  yourordersNavenable() {
    let yourordersNav = document.getElementById('yourordersNav')
    if (this.ordersRes.length != 0) {
      yourordersNav?.classList.replace('d-none', 'd-inline')
    }
  }

  logOut() {

    this._AuthService.logout()

  }

  itemClick(id: any) {

    this._Router.navigate(['/productPage', id])

  }
  i: number = -1
  



}
