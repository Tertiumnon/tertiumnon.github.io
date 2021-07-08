import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectControlPanelComponent } from './project-control-panel.component';

describe('ControlPanelComponent', () => {
  let component: ProjectControlPanelComponent;
  let fixture: ComponentFixture<ProjectControlPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
