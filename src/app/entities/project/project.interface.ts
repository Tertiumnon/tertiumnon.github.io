import { Params } from "@angular/router";

export enum ProjectStatus {
  Inactive = "0",
  Active = "1",
}

export interface IProject extends Params {
  name: string;
  title: string;
  type: string;
  description: string;
  image: string;
  imagePreview: string;
  link: string;
  year: number;
  status: ProjectStatus;
}

export interface IState {
  filterByStatus?: ProjectStatus;
  filterByWorkType?: string;
  sortByAttrVal?: string;
}