import { AsyncPipe, CommonModule } from "@angular/common";
import {
	Component,
	DestroyRef,
	ElementRef,
	HostListener,
	inject,
	OnInit,
	viewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { EditorTabsComponent } from "./components/editor-tabs/editor-tabs.component";
import { EmulatorComponent } from "./components/emulator/emulator.component";
import { FontService } from "./components/font/font.service";
import { LightboxComponent } from "./components/lightbox/lightbox.component";
import { LightboxService } from "./components/lightbox/lightbox.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StatusBarComponent } from "./components/status-bar/status-bar.component";
import { TerminalComponent } from "./components/terminal/terminal.component";
import { TerminalService } from "./components/terminal/terminal.service";
import { Theme } from "./components/theme/theme.constants";
import { ThemeService } from "./components/theme/theme.service";
import { LayoutService } from "./components/workbench/layout.service";

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
		LightboxComponent,
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
	private readonly lightbox = inject(LightboxService);
	isHomePage$ = new BehaviorSubject(true);
	readonly bgLayer = viewChild<ElementRef<HTMLElement>>("bgLayer");

	// Expanded: the dragged width. Collapsed: the icon rail.
	sidebarColumn(): string {
		return this.layout.sidebarOpen()
			? `${this.layout.sidebarWidth()}px`
			: "48px";
	}

	// Pictures in content (screenshots, README images) open full size in the popup.
	@HostListener("document:click", ["$event"])
	onImageClick(event: MouseEvent): void {
		const target = event.target;
		if (
			!(target instanceof HTMLImageElement) ||
			target.closest("a") ||
			!target.closest(".content, .screenshots")
		)
			return;
		this.lightbox.open(target.src);
	}

	@HostListener("document:keydown", ["$event"])
	onGlobalKeydown(event: KeyboardEvent): void {
		if (event.ctrlKey && event.key === "`") {
			event.preventDefault();
			this.terminal.toggle();
		}
	}

	// Honey Pie only: a slight drift of the background picture each time a new page opens.
	// The scale keeps the picture covering the edges while it moves.
	private nudgeBackground(): void {
		if (this.themeService.theme() !== Theme.HoneyPie) return;
		this.bgLayer()?.nativeElement.animate(
			// A damped wobble: each swing is smaller than the last, so the picture settles without a stop.
			[
				{
					transform: "scale(1.03) translate(0, 0)",
					easing: "cubic-bezier(0.33, 0, 0.67, 1)",
				},
				{
					transform: "scale(1.03) translate(-8px, 5px)",
					offset: 0.3,
					easing: "cubic-bezier(0.33, 0, 0.67, 1)",
				},
				{
					transform: "scale(1.03) translate(3px, -2px)",
					offset: 0.6,
					easing: "cubic-bezier(0.33, 0, 0.67, 1)",
				},
				{
					transform: "scale(1.03) translate(-1px, 1px)",
					offset: 0.82,
					easing: "cubic-bezier(0.33, 0, 0.67, 1)",
				},
				{ transform: "scale(1.03) translate(0, 0)" },
			],
			{ duration: 1200 },
		);
	}

	ngOnInit(): void {
		this.router.events
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.isHomePage$.next(["/", "/index"].includes(event.url));
					this.nudgeBackground();
				}
			});
	}
}
