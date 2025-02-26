import { Component } from "@angular/core";
import { EmulatorService } from "../../components/emulator/emulator.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  standalone: true,
})
export class HomeComponent {
  constructor(private emulatorService: EmulatorService) {}

  ngOnInit(): void {
    this.emulatorService.lines = [
      "Hello world!",
      "My name is Vitalii Balabanov.",
      "I'm a software engineer.",
      "This is my personal website.",
    ];
  }
}
