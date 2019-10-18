import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle', { static: true })
  public title: ElementRef<HTMLHeadElement>;

  public ngAfterViewInit(): void {
    // Желательно использовать Renderer2
    this.title.nativeElement.textContent = 'shop';
  }
}
