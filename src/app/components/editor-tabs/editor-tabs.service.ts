import { Injectable, inject, signal } from "@angular/core";
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs";
import PROJECT_ITEMS from "../../entities/project/project.mock";
import { PostService } from "../../entities/post/post.service";
import { Post } from "../../entities/post/post.types";

export type NavLevel = 1 | 2 | 3;

export interface EditorTab {
	url: string;
	title: string;
	level: NavLevel;
}

const HOME_URL = "/index";
const LANGUAGE_SEGMENTS = ["en", "ru"];
// Titles of the top-level sections, used for their first-level tab.
const SECTION_TITLES: Record<string, string> = {
	index: "Home",
	projects: "Projects",
	changelog: "Changelog",
	posts: "Posts",
	tools: "Tools",
	about: "Contact",
};

// The tab slot follows the URL depth: /projects is level 1, /projects/x is level 2, deeper paths are level 3.
// A leading language segment (/en/changelog) does not count.
export function levelForUrl(url: string): NavLevel {
	const segments = url.split("/").filter((segment) => segment.length > 0);
	if (segments.length > 0 && LANGUAGE_SEGMENTS.includes(segments[0])) segments.shift();
	// Sub pages of a project (README, screenshots, ...) stay in the project's own tab.
	if (segments[0] === "projects" && segments.length > 2) return 2;
	return Math.min(3, Math.max(1, segments.length)) as NavLevel;
}

// One slot per level: the first tab holds level 1, the second level 2, the third level 3.
// Opening a deeper page also opens its parents in their slots, so a post opens Posts first, then the post.
@Injectable({
	providedIn: "root",
})
export class EditorTabsService {
	private readonly router = inject(Router);
	private readonly postService = inject(PostService);
	readonly tabs = signal<EditorTab[]>([]);
	readonly activeUrl = signal("");
	// Target of the navigation in progress: the sidebar highlights it before the page has loaded.
	readonly navigatingUrl = signal("");
	readonly loading = signal(false);
	private posts: Post[] = [];

	constructor() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => this.track());
		this.router.events.subscribe((event) => this.onNavigationEvent(event));
		// Post titles come from the posts index; tabs that were opened before it loaded get their title then.
		this.postService.getAll().subscribe({
			next: (posts) => {
				this.posts = posts;
				this.tabs.update((tabs) => tabs.map((tab) => ({ ...tab, title: this.titleFor(tab.url, tab.title) })));
			},
			error: () => {
				this.posts = [];
			},
		});
	}

	activate(url: string): void {
		this.router.navigateByUrl(url);
	}

	close(url: string): void {
		const tabs = this.tabs();
		const index = tabs.findIndex((tab) => tab.url === url);
		// The first slot is pinned and cannot be closed.
		if (index <= 0) return;

		const remaining = tabs.filter((tab) => tab.url !== url);
		this.tabs.set(remaining);
		if (url !== this.activeUrl()) return;

		// Closing the active tab opens its neighbour.
		const neighbour = remaining[index - 1] ?? remaining[index];
		this.router.navigateByUrl(neighbour ? neighbour.url : HOME_URL);
	}

	// Project and post tabs carry the page's own title; other pages use their route title.
	private titleFor(url: string, routeTitle: string): string {
		const projectMatch = /^\/projects\/([^/]+)(?:\/[^/]+)?$/.exec(url);
		if (projectMatch) {
			const project = PROJECT_ITEMS.find((item) => item.name === projectMatch[1]);
			if (project) return project.title;
		}
		if (/^\/(en|ru)\/posts\/[^/]+$/.test(url)) {
			const post = this.posts.find((item) => item.link === url);
			if (post) return post.title;
		}
		return routeTitle;
	}

	private onNavigationEvent(event: RouterEvent): void {
		if (event instanceof NavigationStart) {
			this.loading.set(true);
			this.navigatingUrl.set(event.url.split(/[?#]/)[0]);
		} else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
			this.loading.set(false);
			this.navigatingUrl.set("");
		}
	}

	// Puts a tab in its slot: a tab already open keeps its place and takes the new title.
	private place(tabs: EditorTab[], tab: EditorTab): EditorTab[] {
		if (tabs.some((existing) => existing.url === tab.url)) {
			return tabs.map((existing) => (existing.url === tab.url ? { ...existing, title: tab.title } : existing));
		}
		const slot = tabs.find((existing) => existing.level === tab.level);
		if (slot) {
			return tabs.map((existing) => (existing === slot ? tab : existing));
		}
		const next = tabs.findIndex((existing) => existing.level > tab.level);
		return next < 0 ? [...tabs, tab] : [...tabs.slice(0, next), tab, ...tabs.slice(next)];
	}

	private track(): void {
		let route = this.router.routerState.snapshot.root;
		while (route.firstChild) route = route.firstChild;
		const url = this.router.url.split(/[?#]/)[0];
		const title = this.titleFor(url, route.title ?? "");
		const level = levelForUrl(url);

		// Parent pages of a deeper page, one per lower level: /en/posts/x has parent /en/posts.
		const segments = url.split("/").filter((segment) => segment.length > 0);
		const lang = LANGUAGE_SEGMENTS.includes(segments[0]) ? segments.shift() : undefined;
		const prefix = lang ? [lang] : [];
		const parents: EditorTab[] = [];
		for (let parentLevel = 1; parentLevel < level; parentLevel++) {
			const parentUrl = `/${[...prefix, ...segments.slice(0, parentLevel)].join("/")}`;
			const parentTitle = this.titleFor(parentUrl, parentLevel === 1 ? SECTION_TITLES[segments[0]] ?? "" : "");
			parents.push({ url: parentUrl, title: parentTitle, level: parentLevel as NavLevel });
		}

		this.activeUrl.set(url);
		this.tabs.update((tabs) => [...parents, { url, title, level }].reduce((result, tab) => this.place(result, tab), tabs));
	}
}
