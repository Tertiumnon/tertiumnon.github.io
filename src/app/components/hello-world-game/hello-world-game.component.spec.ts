import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { HelloWorldGameComponent } from "./hello-world-game.component";

describe("HelloWorldGameComponent", () => {
	let component: HelloWorldGameComponent;
	let fixture: ComponentFixture<HelloWorldGameComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [HelloWorldGameComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HelloWorldGameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
