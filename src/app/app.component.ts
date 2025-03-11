import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { EmulatorComponent } from "./components/emulator/emulator.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { BehaviorSubject } from "rxjs";
import { CommonModule } from "@angular/common";
import { ThemeService } from "./components/theme/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  standalone: true,
  imports: [CommonModule, EmulatorComponent, HeaderComponent, FooterComponent, RouterOutlet],
})
export class AppComponent {
  title = "Tertiumnon";
  isHomePage$ = new BehaviorSubject(true);
  router$ = inject(Router);
  themeService = inject(ThemeService);

  ngOnInit() {
    this.router$.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage$.next(["/", "/index"].includes(event.url));
      }
    });
  }
}
