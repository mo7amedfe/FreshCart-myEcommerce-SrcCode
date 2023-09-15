import { CartService } from './../cart.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private _Router: Router) { }

  cartId: string = ''
  ngOnInit(): void {
    this.cartId = this._ActivatedRoute.snapshot.params['id']
  }

  shippingAddress = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  });

  checkOut(data: FormGroup) {

    this._CartService.checkout(this.cartId, data.value).subscribe({

      next: (res) => {
        // this._Router.navigate([res.session.url])
        // console.log(res.session.url);
        window.location.href = res.session.url
      }
    })

  }


}
