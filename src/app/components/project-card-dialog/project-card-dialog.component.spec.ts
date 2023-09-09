import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
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
