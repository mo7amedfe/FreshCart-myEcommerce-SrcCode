import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsProductsComponent } from './brands-products.component';

describe('BrandsProductsComponent', () => {
  let component: BrandsProductsComponent;
  let fixture: ComponentFixture<BrandsProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandsProductsComponent]
    });
    fixture = TestBed.createComponent(BrandsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
