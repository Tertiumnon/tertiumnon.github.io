/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from "./order-by.utils";

@Pipe({
	name: "orderBy",
	standalone: true,
})
export class OrderByPipe implements PipeTransform {
	transform<T extends Record<string, unknown>>(
		value: T[],
		...args: string[]
	): T[] {
		return orderBy(value, ...args);
	}
}
