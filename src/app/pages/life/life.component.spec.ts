import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LifeComponent } from "./life.component";

describe("LifeComponent", () => {
  let component: LifeComponent;
  let fixture: ComponentFixture<LifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
