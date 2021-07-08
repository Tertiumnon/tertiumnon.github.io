import { Component } from '@angular/core';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.less']
})
export class HelpersComponent {

  static orderBy(list: any, ...args: any[]) {
    const direction = args[0][0];
    const column = direction === '-' ? args[0].slice(1) : args[0];
    const newList = [...list];
    newList.sort((a: any, b: any) => {
      if (a[column] < b[column]) {
        return (direction === '-' ? -1 : 1);
      } else if (a[column] > b[column]) {
        return (direction === '-' ? 1 : -1);
      } else {
        return 0;
      }
    });
    return newList;
  }

  static filterBy(list: any, param: string, val: string | undefined) {
    let sParam: string;
    let sVal: any;
    const newList = [...list];
    if (param === 'status') {
      sParam = 'active';
      sVal = val === 'inactive' ? false : true;
      newList.forEach((item) => {
        if (sVal === 'all') {
          item.visibility = true;
        } else {
          if (item[sParam] === sVal) {
            item.visibility = true;
          } else {
            item.visibility = false;
          }
        }
      });
    } else if (param === 'type') {
      sParam = 'categories';
      sVal = val;
      newList.forEach((item) => {
        if (sVal === 'all') {
          item.visibility = true;
        } else {
          if (item.categories.includes(sVal)) {
            item.visibility = true;
          } else {
            item.visibility = false;
          }
        }
      });
    }
    return newList;
  }
}
