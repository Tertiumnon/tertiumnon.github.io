/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from "@angular/core";

import { HelpersComponent } from "../components/helpers/helpers.component";

@Pipe({
    name: "orderBy",
    standalone: true
})
export class OrderByPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return HelpersComponent.orderBy(value, ...args);
  }
}
