import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.less']
})
export class ProjectCardComponent implements OnInit {

  @Input() title: string;
  @Input() year: number;
  @Input() image: string;
  @Input() type: string;
  @Input() categories: string[];

  constructor() { }

  ngOnInit() {
  }

}
