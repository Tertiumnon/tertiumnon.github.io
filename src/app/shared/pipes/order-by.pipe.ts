import { Pipe, PipeTransform } from '@angular/core';

import { HelpersComponent } from '../helpers/helpers.component';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return HelpersComponent.orderBy(value, ...args);
  }

}
