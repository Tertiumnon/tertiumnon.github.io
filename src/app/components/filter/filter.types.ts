export interface IFilter {
	name: string;
	operator: import("./filter.constants").FilterOperator;
	value: string | string[] | number | number[];
}
