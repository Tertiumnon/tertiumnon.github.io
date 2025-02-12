import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatTimeComponent } from './what-time.component';

describe('WhatTimeComponent', () => {
  let component: WhatTimeComponent;
  let fixture: ComponentFixture<WhatTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
