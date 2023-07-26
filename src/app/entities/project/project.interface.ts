export enum ProjectStatus {
  Inactive = "0",
  Active = "1",
}

export interface IProject {
  title: string;
  type: string;
  description: string;
  image: string;
  imagePreview: string;
  link: string;
  year: number;
  workTypes: string[];
  status: ProjectStatus;
}

export interface IState {
  filterByStatus?: ProjectStatus;
  filterByWorkType?: string;
  sortByAttrVal?: string;
}
