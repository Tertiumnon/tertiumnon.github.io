/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from "@angular/core";
import { ProjectControlPanelService } from "../components/project-control-panel/project-control-panel.service";

@Pipe({
  name: "orderBy",
  standalone: true,
})
export class OrderByPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return ProjectControlPanelService.orderBy(value, ...args);
  }
}
