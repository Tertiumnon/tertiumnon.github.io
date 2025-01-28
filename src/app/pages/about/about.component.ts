import { Component, OnInit } from "@angular/core";
import { EmulatorService } from "../../components/emulator/emulator.service";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    standalone: true
})
export class AboutComponent implements OnInit {
  constructor(private emulatorService: EmulatorService) {}

  ngOnInit(): void {
    this.emulatorService.lines = [
      "Hello world!",
      "My name is Vitalii Balabanov.",
      "I'm a software engineer.",
      "It's my personal website.",
      "Here you can find projects that were designed and implemented by me.",
      "",
      "LinkedIn: <a href='https://www.linkedin.com/in/tertium/'>https://www.linkedin.com/in/tertium/</a>",
      "Email: <a href='mailto:tertiumnon@gmail.com'>tertiumnon@gmail.com</a>",
    ];
  }
}
