import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.less']
})
export class ProjectCardComponent {
  @Input() title = '';
  @Input() year = 0;
  @Input() image = '';
  @Input() type = '';
  @Input() categories: string[] = [];
  @Input() description = '';
}
