import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe<T> implements PipeTransform {

  transform(array: Array<T>, property: string, asc: boolean = false): Array<T> {
    return array
      .sort((a: T, b: T) => asc
        ? get(a, property) - get(b, property)
        : get(b, property) - get(a, property)
      );
  }

}
