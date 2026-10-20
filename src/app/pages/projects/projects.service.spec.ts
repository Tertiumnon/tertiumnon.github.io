import { describe, it, expect } from "vitest";
import { ProjectsService } from "./projects.service";

describe("ProjectsService", () => {
	it("lists projects newest first before any filter is changed", () => {
		const dates = new ProjectsService().projects$.value?.map((project) => project.updatedAt) ?? [];
		const dated = dates.filter((date) => date !== undefined);
		expect(dated).toEqual([...dated].sort().reverse());
		expect(dates.slice(dated.length).every((date) => date === undefined)).toBe(true);
	});
});
