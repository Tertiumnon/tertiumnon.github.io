import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, DestroyRef, HostListener, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { EditorTabsComponent } from "./components/editor-tabs/editor-tabs.component";
import { EmulatorComponent } from "./components/emulator/emulator.component";
import { LayoutService } from "./components/workbench/layout.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StatusBarComponent } from "./components/status-bar/status-bar.component";
import { TerminalComponent } from "./components/terminal/terminal.component";
import { TerminalService } from "./components/terminal/terminal.service";
import { FontService } from "./components/font/font.service";
import { ThemeService } from "./components/theme/theme.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	standalone: true,
	imports: [
		AsyncPipe,
		CommonModule,
		SidebarComponent,
		EditorTabsComponent,
		EmulatorComponent,
		StatusBarComponent,
		TerminalComponent,
		RouterOutlet,
	],
})
export class AppComponent implements OnInit {
	title = "Tertiumnon";
	private destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);
	themeService = inject(ThemeService);
	layout = inject(LayoutService);
	terminal = inject(TerminalService);
	fontService = inject(FontService);
	isHomePage$ = new BehaviorSubject(true);

	// Expanded: the dragged width. Collapsed: the icon rail.
	sidebarColumn(): string {
		return this.layout.sidebarOpen() ? `${this.layout.sidebarWidth()}px` : "48px";
	}

	@HostListener("document:keydown", ["$event"])
	onGlobalKeydown(event: KeyboardEvent): void {
		if (event.ctrlKey && event.key === "`") {
			event.preventDefault();
			this.terminal.toggle();
		}
	}

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
