import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectCardDialog } from './project.interface';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  const projectCardDialog: ProjectCardDialog = {
    title: 'string',
    image: 'string',
    link: 'string',
    description: 'string',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectComponent],
        imports: [
        ],
        providers: [
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
