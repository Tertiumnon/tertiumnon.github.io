import { Component, DestroyRef, signal, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from "@angular/router";
import { NavComponent } from "../nav/nav.component";
import { CommonModule } from "@angular/common";

const ANIMATION_DURATION_MS = 1000;
const CLICK_ANIMATION_DURATION_MS = 2000;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  standalone: true,
  imports: [RouterLink, NavComponent, RouterLinkActive, CommonModule],
})
export class HeaderComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  isAnimating = signal(false);

  constructor() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isAnimating.set(true);
          setTimeout(() => this.isAnimating.set(false), ANIMATION_DURATION_MS);
        }
      });
  }

  onProgressBarClick(): void {
    this.isAnimating.set(true);
    setTimeout(() => this.isAnimating.set(false), CLICK_ANIMATION_DURATION_MS);
  }
}
