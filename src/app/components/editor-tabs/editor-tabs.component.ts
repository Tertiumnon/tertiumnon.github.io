import { Component, inject } from "@angular/core";
import { EditorTabsService } from "./editor-tabs.service";

export type TabIcon =
	| "home"
	| "projects"
	| "lines"
	| "posts"
	| "tools"
	| "about-me";

const LANGUAGE_SEGMENTS = ["en", "ru"];
const SECTION_ICONS: Record<string, TabIcon> = {
	index: "home",
	projects: "projects",
	lines: "lines",
	posts: "posts",
	tools: "tools",
	about: "about-me",
};

@Component({
	selector: "app-editor-tabs",
	standalone: true,
	templateUrl: "./editor-tabs.component.html",
	styleUrl: "./editor-tabs.component.css",
})
export class EditorTabsComponent {
	readonly tabsService = inject(EditorTabsService);

	// The icon of a tab is the icon of its section, the first path segment after the language.
	iconFor(url: string): TabIcon | undefined {
		const segments = url.split("/").filter((segment) => segment.length > 0);
		if (segments.length > 0 && LANGUAGE_SEGMENTS.includes(segments[0]))
			segments.shift();
		return segments.length > 0 ? SECTION_ICONS[segments[0]] : undefined;
	}
}
