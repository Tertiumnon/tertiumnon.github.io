import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { EmulatorComponent } from "./components/emulator/emulator.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
    standalone: true,
    imports: [EmulatorComponent, HeaderComponent, FooterComponent, RouterOutlet],
})
export class AppComponent {
  title = "Tertiumnon";
}
