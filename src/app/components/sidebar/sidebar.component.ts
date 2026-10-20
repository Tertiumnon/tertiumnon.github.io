import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter } from "rxjs";
import { EditorTabsService } from "../editor-tabs/editor-tabs.service";
import { LayoutService } from "../workbench/layout.service";
import {
	SearchScope,
	SidebarSearchComponent,
} from "./sidebar-search.component";

const ANIMATION_DURATION_MS = 1000;
const CLICK_ANIMATION_DURATION_MS = 2000;

type SidebarIcon = "projects" | "lines" | "posts" | "tools" | "about-me";

interface SidebarSection {
	label: string;
	link: string;
	icon: SidebarIcon;
}

@Component({
	selector: "app-sidebar",
	standalone: true,
	templateUrl: "./sidebar.component.html",
	styleUrl: "./sidebar.component.css",
	imports: [RouterLink, SidebarSearchComponent],
})
export class SidebarComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);
	readonly layout = inject(LayoutService);
	readonly tabs = inject(EditorTabsService);
	readonly isAnimating = signal(false);

	readonly sections: SidebarSection[] = [
		{ label: "Projects", link: "/projects", icon: "projects" },
		{ label: "Lines", link: "/lines", icon: "lines" },
		{ label: "Posts", link: "/posts", icon: "posts" },
		{ label: "Tools", link: "/tools", icon: "tools" },
		{ label: "About me", link: "/about-me", icon: "about-me" },
	];

	constructor() {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => this.animateLogo(ANIMATION_DURATION_MS));
	}

	isSectionActive(section: SidebarSection): boolean {
		// Changelog and posts live under a language prefix (/en/changelog), which the sidebar paths do not have.
		const active = (this.tabs.navigatingUrl() || this.tabs.activeUrl()).replace(
			/^\/(en|ru)(?=\/|$)/,
			"",
		);
		return active === section.link || active.startsWith(`${section.link}/`);
	}

	// Dragging the right edge sets the sidebar width; the layout service clamps it and saves it.
	startResize(event: PointerEvent): void {
		event.preventDefault();
		this.layout.resizing.set(true);
		const move = (pointer: PointerEvent): void =>
			this.layout.setSidebarWidth(pointer.clientX);
		const stop = (): void => {
			this.layout.resizing.set(false);
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", stop);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", stop);
	}

	// Search is offered on the projects and posts list pages only, and searches that content type.
	searchScope(): SearchScope | undefined {
		const segments = this.tabs
			.activeUrl()
			.split("/")
			.filter((segment) => segment.length > 0);
		if (segments.length > 0 && ["en", "ru"].includes(segments[0]))
			segments.shift();
		if (segments.length !== 1) return undefined;
		return segments[0] === "projects"
			? "project"
			: segments[0] === "posts"
				? "post"
				: undefined;
	}

	onLogoClick(): void {
		this.animateLogo(CLICK_ANIMATION_DURATION_MS);
	}

	private animateLogo(durationMs: number): void {
		this.isAnimating.set(true);
		setTimeout(() => this.isAnimating.set(false), durationMs);
	}
}
