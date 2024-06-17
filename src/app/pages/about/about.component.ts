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
      "My name is Vitalii &#60;Tertiumnon&#62; Balabanov.",
      "I'm a software engineer."
    ];
  }
}
