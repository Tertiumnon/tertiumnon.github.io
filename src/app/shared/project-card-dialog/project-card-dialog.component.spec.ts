import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ProjectCardDialog } from './project-card-dialog';
import { ProjectCardDialogComponent } from './project-card-dialog.component';

describe('ProjectCardDialogComponent', () => {
  let component: ProjectCardDialogComponent;
  let fixture: ComponentFixture<ProjectCardDialogComponent>;
  const projectCardDialog: ProjectCardDialog = {
    title: 'string',
    image: 'string',
    link: 'string',
    description: 'string',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectCardDialogComponent],
        imports: [
          MatButtonModule,
          MatDialogModule,
          MatCardModule,
          MatIconModule,
        ],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: projectCardDialog,
          },
          {
            provide: MatDialogRef,
            useValue: {},
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
