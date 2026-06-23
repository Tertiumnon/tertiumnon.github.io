import { describe, it, expect } from "vitest";
import { ProjectControlPanelService } from "./project-control-panel.service";
import { IProject, ProjectStatus } from "../../entities/project/project.interface";

const makeProject = (overrides: Partial<IProject> = {}): IProject => ({
	name: "project",
	title: "Project",
	type: "web",
	description: "",
	image: "",
	imagePreview: "",
	link: "",
	year: 2020,
	status: ProjectStatus.Active,
	workTypes: [],
	...overrides,
});

describe("ProjectControlPanelService.orderBy", () => {
	it("sorts descending by year (default)", () => {
		const list = [makeProject({ year: 2022 }), makeProject({ year: 2020 }), makeProject({ year: 2021 })];
		const result = ProjectControlPanelService.orderBy(list, "year");
		expect(result.map((p) => p.year)).toEqual([2022, 2021, 2020]);
	});

	it("sorts ascending by year when prefixed with -", () => {
		const list = [makeProject({ year: 2021 }), makeProject({ year: 2023 }), makeProject({ year: 2019 })];
		const result = ProjectControlPanelService.orderBy(list, "-year");
		expect(result.map((p) => p.year)).toEqual([2019, 2021, 2023]);
	});

	it("does not mutate the original list", () => {
		const list = [makeProject({ year: 2022 }), makeProject({ year: 2020 })];
		ProjectControlPanelService.orderBy(list, "year");
		expect(list[0].year).toBe(2022);
	});
});

describe("ProjectControlPanelService.filterBy", () => {
	it("returns all projects when value is 'all'", () => {
		const list = [makeProject({ status: ProjectStatus.Active }), makeProject({ status: ProjectStatus.Inactive })];
		const result = ProjectControlPanelService.filterBy(list, "status", "all");
		expect(result).toHaveLength(2);
	});

	it("filters by status", () => {
		const list = [makeProject({ status: ProjectStatus.Active }), makeProject({ status: ProjectStatus.Inactive })];
		const result = ProjectControlPanelService.filterBy(list, "status", ProjectStatus.Active) as IProject[];
		expect(result).toHaveLength(1);
		expect(result[0].status).toBe(ProjectStatus.Active);
	});

	it("filters by workType", () => {
		const list = [
			makeProject({ workTypes: ["frontend", "backend"] }),
			makeProject({ workTypes: ["backend"] }),
		];
		const result = ProjectControlPanelService.filterBy(list, "workType", "frontend") as IProject[];
		expect(result).toHaveLength(1);
	});
});
