import { Component } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html"
})
export class AboutComponent {
  lines = [
    "Hello world!",
    "My name is Vitalii &#60;Tertiumnon&#62; Balabanov.",
    "I'm a software engineer."
  ];
}
