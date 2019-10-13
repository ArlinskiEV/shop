import { Component, OnInit } from '@angular/core';

enum Category {
  Temp = 'Temp',
  New = 'New',
  Main = 'Main'
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.less']
})
export class FirstComponent implements OnInit {

  public name: string = 'FirstComponent';
  public description: string = 'FirstComponent Angular 2 #23 Task 1';
  public price: number = 0;
  public category: Category = Category.Temp;
  public isAvailable: boolean = true;

  public readonly Category: ReadonlyArray<Category> = [
    Category.Temp,
    Category.New,
    Category.Main
  ];

  public readonly props: ReadonlyArray<string> = [
    'name',
    'description',
    'price',
    'category',
    'Category',
    'props'
  ];


  constructor() { }

  public ngOnInit(): void {
  }

}
