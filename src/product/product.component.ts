import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

  public onBuy(): void {
    console.log('Buy product');
  }

}
