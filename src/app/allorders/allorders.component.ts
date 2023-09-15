import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private _CartService: CartService, private _AuthService: AuthService) {
    // console.log(this._AuthService.userData().id);

  }
  order: any;

  ngOnInit(): void {
    this._CartService.getUserOrders(this._AuthService.userData().id).subscribe({
      next: (res) => {
    
        this.order=res
        //  console.log(this.order);
         
      }
    })
  }
}
