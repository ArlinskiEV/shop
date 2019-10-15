import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  private isHighlighted: boolean = false;

  @HostBinding('class.highlight')
  public get highlight(): boolean {
    return this.isHighlighted;
  }

  @HostListener('mouseenter', ['$event.target'])
  public onMouseEnter(): void {
    this.isHighlighted = true;
  }

  @HostListener('mouseleave', ['$event.target'])
  public onMouseLeave(): void {
    this.isHighlighted = false;
  }
}
