import { TestBed } from "@angular/core/testing";

import { ProjectControlPanelService } from "./project-control-panel.service";

describe("ProjectControlPanelService", () => {
	let service: ProjectControlPanelService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ProjectControlPanelService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
