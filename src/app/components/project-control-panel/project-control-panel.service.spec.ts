import { describe, expect, it } from "vitest";
import {
	ProjectLicense,
	ProjectStatus,
} from "../../entities/project/project.constants";
import { IProject } from "../../entities/project/project.types";
import { ProjectControlPanelService } from "./project-control-panel.service";

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
	license: ProjectLicense.OpenSource,
	...overrides,
});

describe("ProjectControlPanelService.orderBy", () => {
	it("sorts descending by year (default)", () => {
		const list = [
			makeProject({ year: 2022 }),
			makeProject({ year: 2020 }),
			makeProject({ year: 2021 }),
		];
		const result = ProjectControlPanelService.orderBy(list, "year");
		expect(result.map((p) => p.year)).toEqual([2022, 2021, 2020]);
	});

	it("sorts ascending by year when prefixed with -", () => {
		const list = [
			makeProject({ year: 2021 }),
			makeProject({ year: 2023 }),
			makeProject({ year: 2019 }),
		];
		const result = ProjectControlPanelService.orderBy(list, "-year");
		expect(result.map((p) => p.year)).toEqual([2019, 2021, 2023]);
	});

	it("places items without a value last in both directions", () => {
		const list = [
			makeProject({ updatedAt: undefined }),
			makeProject({ updatedAt: "2025-01-01" }),
			makeProject({ updatedAt: "2026-01-01" }),
		];
		expect(
			ProjectControlPanelService.orderBy(list, "updatedAt").map(
				(p) => p.updatedAt,
			),
		).toEqual(["2026-01-01", "2025-01-01", undefined]);
		expect(
			ProjectControlPanelService.orderBy(list, "-updatedAt").map(
				(p) => p.updatedAt,
			),
		).toEqual(["2025-01-01", "2026-01-01", undefined]);
	});

	it("does not mutate the original list", () => {
		const list = [makeProject({ year: 2022 }), makeProject({ year: 2020 })];
		ProjectControlPanelService.orderBy(list, "year");
		expect(list[0].year).toBe(2022);
	});
});

describe("ProjectControlPanelService.filterBy", () => {
	it("returns all projects when value is 'all'", () => {
		const list = [
			makeProject({ status: ProjectStatus.Active }),
			makeProject({ status: ProjectStatus.Inactive }),
		];
		const result = ProjectControlPanelService.filterBy(list, "status", "all");
		expect(result).toHaveLength(2);
	});

	it("filters by status", () => {
		const list = [
			makeProject({ status: ProjectStatus.Active }),
			makeProject({ status: ProjectStatus.Inactive }),
		];
		const result = ProjectControlPanelService.filterBy(
			list,
			"status",
			ProjectStatus.Active,
		) as IProject[];
		expect(result).toHaveLength(1);
		expect(result[0].status).toBe(ProjectStatus.Active);
	});

	it("filters by license", () => {
		const list = [
			makeProject({ license: ProjectLicense.OpenSource }),
			makeProject({ license: ProjectLicense.Free }),
		];
		const result = ProjectControlPanelService.filterBy(
			list,
			"license",
			ProjectLicense.Free,
		) as IProject[];
		expect(result).toHaveLength(1);
	});
});
