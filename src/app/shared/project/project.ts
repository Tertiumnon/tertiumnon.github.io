export interface IProject {
  title: string;
  type: string;
  description: string;
  image: string;
  imagePreview: string;
  link: string;
  year: number;
  categories: string[];
  active: boolean;
  visibility: boolean;
}

export interface State {
  filterByStatus?: string;
  filterByType?: string;
  sortByAttrVal?: string;
}
