import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmulatorComponent } from "./emulator.component";

describe("EmulatorComponent", () => {
  let component: EmulatorComponent;
  let fixture: ComponentFixture<EmulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmulatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
