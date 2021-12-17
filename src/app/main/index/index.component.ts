import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  lines: string[] = [];

  constructor() {}

  ngOnInit() {
    this.lines = [
      'Hello world!',
      'My name is Vitaliy Balabanov aka Vit Tertiumnon.',
      "I'm a software engineer.",
      "My <a href=\"/projects\">projects</a>",
      "<a href=\"/about\">About me</a>",
    ];
  }
}
