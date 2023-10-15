import { Component } from "@angular/core";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent {
  lines = [
    'Hello world!',
    'My name is Vitalii &#60;Tertiumnon&#62; Balabanov.',
    `I'm a software engineer.`
  ];
}
