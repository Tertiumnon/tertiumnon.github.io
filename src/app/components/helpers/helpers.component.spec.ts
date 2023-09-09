import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpersComponent } from './helpers.component';

describe('HelpersComponent', () => {
  let component: HelpersComponent;
  let fixture: ComponentFixture<HelpersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
