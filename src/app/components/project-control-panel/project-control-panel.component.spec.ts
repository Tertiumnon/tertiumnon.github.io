import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { ProjectControlPanelComponent } from "./project-control-panel.component";

describe("ControlPanelComponent", () => {
	let component: ProjectControlPanelComponent;
	let fixture: ComponentFixture<ProjectControlPanelComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, ProjectControlPanelComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectControlPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
