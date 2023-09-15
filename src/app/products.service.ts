import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  isInWishList_ser =new BehaviorSubject(false);
  constructor(private _HttpClient:HttpClient) { }

  
  isWishListFun() {
    if (this.isInWishList_ser.getValue()==true) {
      document.getElementById('heart')?.classList.add('fa-solid')
    } else {
      document.getElementById('heart')?.classList.add('fa-regular')

    }
  }

  getBrands_products (id:any):Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
subCategories(id:any):Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);

}
  getProducts ():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getBrands ():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  productDetailes (id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

  }
  categories ():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }
  addToWishList (id:string):Observable<any>{
   
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: id })

  }
  
   WishList ():Observable<any>{
   
     return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
 
   }
   
  removeFromWishList (id:string):Observable<any>{
    
     return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
 
   }

}
