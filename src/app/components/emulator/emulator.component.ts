import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-emulator",
  templateUrl: "./emulator.component.html",
  styleUrls: ["./emulator.component.less"],
  encapsulation: ViewEncapsulation.None,
})
export class EmulatorComponent {
  @Input() lines: string[] = [];
  @Input() isCliEnabled = false;
  command = "";

  onEnter(): void {
    const {command} = this;
    this.lines.push(command);
    switch (command) {
      case "help()":
        this.lines = [
          "clear() will clear all lines"
        ];
        break;
      case "clear()":
        this.lines = [];
        break;
      }
    this.command = "";
  }
}
