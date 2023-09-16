export enum FilterOperator {
  Equal = 'eq',
}

export interface IFilter {
  name: string;
  operator: FilterOperator;
  value: string | string[] | number | number[];
}
