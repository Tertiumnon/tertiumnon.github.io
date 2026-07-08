import { Component, signal, inject } from "@angular/core";
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from "@angular/router";
import { NavComponent } from "../nav/nav.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  standalone: true,
  imports: [RouterLink, NavComponent, RouterLinkActive, CommonModule],
})
export class HeaderComponent {
  isAnimating = signal(false);
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAnimating.set(true);
        setTimeout(() => {
          this.isAnimating.set(false);
        }, 1000);
      }
    });
  }

  onProgressBarClick() {
    this.isAnimating.set(true);
    setTimeout(() => {
      this.isAnimating.set(false);
    }, 2000);
  }
}
