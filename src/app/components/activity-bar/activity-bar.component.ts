import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
} from "@angular/router";

const ANIMATION_DURATION_MS = 1000;
const CLICK_ANIMATION_DURATION_MS = 2000;

type ActivityIcon = "projects" | "lines" | "posts" | "tools" | "about-me";

interface ActivityItem {
	label: string;
	link: string[];
	icon: ActivityIcon;
}

@Component({
	selector: "app-activity-bar",
	standalone: true,
	templateUrl: "./activity-bar.component.html",
	styleUrl: "./activity-bar.component.css",
	imports: [RouterLink, RouterLinkActive],
})
export class ActivityBarComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);
	readonly isAnimating = signal(false);

	readonly items: ActivityItem[] = [
		{ label: "Projects", link: ["/projects"], icon: "projects" },
		{ label: "Lines", link: ["/lines"], icon: "lines" },
		{ label: "Posts", link: ["/posts"], icon: "posts" },
		{ label: "Tools", link: ["/tools"], icon: "tools" },
		{ label: "About me", link: ["/about-me"], icon: "about-me" },
	];

	constructor() {
		this.router.events
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((event) => {
				if (event instanceof NavigationEnd)
					this.animateLogo(ANIMATION_DURATION_MS);
			});
	}

	onLogoClick(): void {
		this.animateLogo(CLICK_ANIMATION_DURATION_MS);
	}

	private animateLogo(durationMs: number): void {
		this.isAnimating.set(true);
		setTimeout(() => this.isAnimating.set(false), durationMs);
	}
}
