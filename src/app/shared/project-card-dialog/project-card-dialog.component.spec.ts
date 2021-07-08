import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectCardDialogComponent } from './project-card-dialog.component';

describe('ProjectCardDialogComponent', () => {
  let component: ProjectCardDialogComponent;
  let fixture: ComponentFixture<ProjectCardDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
