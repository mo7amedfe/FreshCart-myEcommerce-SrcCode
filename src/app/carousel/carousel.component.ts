// import { ProductsService } from './../products.service';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products.service';
import { category } from '../products';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  constructor(private _HttpClient: HttpClient, private _ProductsService: ProductsService) { }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
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
    nav: true
  }



  categories: category[] = [];

  ngOnInit(): void {


  }
}



