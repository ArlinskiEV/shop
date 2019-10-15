import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less']
})
export class BaseComponent implements OnDestroy {
  private subscriptions: Array<Subscription> = [];
  // tslint:disable-next-line:ban-types only-arrow-functions
  private childOnDestroy: Function = function() {};

  constructor() {
    const childOnDestroy = this.ngOnDestroy || (() => {});
    this.ngOnDestroy = () => {
      childOnDestroy();
      this.baseOnDestroy();
    };
  }

  protected unsubscribeOnDestroy(subscription: Subscription): Subscription {
    this.subscriptions.push(subscription);
    return subscription;
  }

  public ngOnDestroy() {
    this.baseOnDestroy();
  }

  private baseOnDestroy(): void {
    this.subscriptions
      .forEach((subscription: Subscription) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
  }
}
