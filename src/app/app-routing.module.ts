import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { BrandsProductsComponent } from './brands-products/brands-products.component';
import { HotOffersComponent } from './hot-offers/hot-offers.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent },
  { path: 'allorders', canActivate: [authGuard], component: AllordersComponent },
  { path: 'brands',  component: BrandsComponent },
  { path: 'hot-offers',  component: HotOffersComponent },
  { path: 'brands-product/:id', component: BrandsProductsComponent },
  { path: 'checkout/:id', canActivate: [authGuard], component: CheckoutComponent },
  { path: 'productPage/:id', component: ProductPageComponent },
  { path: 'category/:id', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'home'}

];

@NgModule({

  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
 
})

export class AppRoutingModule {
 
}
