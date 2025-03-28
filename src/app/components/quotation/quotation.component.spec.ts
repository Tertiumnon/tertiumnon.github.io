import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { QuotationComponent } from "./quotation.component";

describe("QuotationComponent", () => {
  let component: QuotationComponent;
  let fixture: ComponentFixture<QuotationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
