import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { EmulatorComponent } from "./components/emulator/emulator.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { ThemeService } from "./components/theme/theme.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	standalone: true,
	imports: [
		CommonModule,
		EmulatorComponent,
		HeaderComponent,
		FooterComponent,
		RouterOutlet,
	],
})
export class AppComponent implements OnInit {
	title = "Tertiumnon";
	private destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);
	themeService = inject(ThemeService);
	isHomePage$ = new BehaviorSubject(true);

	ngOnInit(): void {
		this.router.events
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.isHomePage$.next(["/", "/index"].includes(event.url));
				}
			});
	}
}
