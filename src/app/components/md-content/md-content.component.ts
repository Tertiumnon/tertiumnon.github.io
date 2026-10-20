import { Component, HostListener, Input, inject } from "@angular/core";
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
// register common languages (add more as needed)
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import { marked, Renderer } from "marked";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);

function escapeHtml(str: string): string {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

@Component({
	selector: "app-md-content",
	templateUrl: "./md-content.component.html",
	styleUrl: "./md-content.component.css",
	standalone: true,
})
export class MdContentComponent {
	private readonly sanitizer = inject(DomSanitizer);

	@Input() data = "";
	@Input() category = "";
	@Input() postName = "";
	@Input() postDirname = "";
	@Input() postDate = "";
	@Input() lang = "en";
	@Input() showBreadcrumb = false;
	@Input() lineNumbers = false;
	htmlData: SafeHtml = "";
	private readonly renderer = new Renderer();

	constructor() {
		this.renderer.code = (code: string, infostring?: string): string => {
			const language = (infostring || "").trim().split(/\s+/)[0];
			let highlighted: string;
			try {
				highlighted =
					language && hljs.getLanguage(language)
						? hljs.highlight(code, { language }).value
						: hljs.highlightAuto(code).value;
			} catch (e) {
				highlighted = escapeHtml(code);
			}
			const langClass = language ? ` language-${language}` : "";
			const codeHtml = `<code class="hljs${langClass}">${highlighted}</code>`;
			const copyButton = `<button type="button" class="copy-code" aria-label="Copy code" title="Copy code"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>`;
			if (!this.lineNumbers) return `<pre>${copyButton}${codeHtml}</pre>\n`;
			// Gutter is a separate column, so the highlighted markup stays intact.
			const numbers = code
				.replace(/\n$/, "")
				.split("\n")
				.map((_, i) => i + 1)
				.join("\n");
			return `<pre class="numbered">${copyButton}<span class="gutter" aria-hidden="true">${numbers}</span>${codeHtml}</pre>\n`;
		};
	}

	// The app uses hash-based routing (useHash: true), so an in-page anchor
	// like <a href="#key-features"> would otherwise change location.hash,
	// get intercepted by the Router as a navigation, fail to match any route,
	// and redirect away to the home page via the wildcard route. Handle
	// same-page anchors manually instead of letting them hit the Router.
	@HostListener("click", ["$event"])
	onContentClick(event: MouseEvent): void {
		const copyButton = (event.target as HTMLElement)?.closest?.(".copy-code");
		if (copyButton) {
			const code =
				copyButton.closest("pre")?.querySelector("code")?.textContent ?? "";
			void navigator.clipboard?.writeText(code);
			copyButton.classList.add("copied");
			setTimeout(() => copyButton.classList.remove("copied"), 1500);
			return;
		}
		const anchor = (event.target as HTMLElement)?.closest?.("a");
		const href = anchor?.getAttribute("href");
		if (!href || !href.startsWith("#") || href.length < 2) return;

		const target = document.getElementById(href.slice(1));
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	private stripFrontmatter(md: string): string {
		if (!md.startsWith("---")) return md;
		const end = md.indexOf("\n---", 3);
		if (end === -1) return md;
		return md.slice(end + 4).replace(/^\s+/, "");
	}

	ngOnChanges(): void {
		if (this.data) {
			const markdown = this.stripFrontmatter(this.data);

			let raw: string;
			try {
				raw = marked.parse(markdown, {
					gfm: true,
					breaks: true,
					mangle: false,
					headerIds: true,
					renderer: this.renderer,
				}) as string;
			} catch (error) {
				console.error("Failed to parse markdown:", error);
				raw = "<p>Failed to render content.</p>";
			}

			// Fix image paths post-processing
			if (this.category && this.postDirname) {
				raw = raw.replace(
					/<img\s+src="(?!(?:https?:|\/))([^"]+)"/g,
					`<img src="/assets/posts/${this.postDirname}/$1"`,
				);
			}

			if (this.postDate) {
				const h1Start = raw.indexOf("<h1>");
				if (h1Start !== -1) {
					let dateHtml = `<div class="post-date">${this.postDate}</div>`;
					if (this.showBreadcrumb) {
						dateHtml = `<div class="post-meta"><span class="breadcrumb-group"><span class="breadcrumb-symbol">↑</span><a href="#/${this.lang}/posts" class="breadcrumb-link">Posts</a></span><span class="post-date">${this.postDate}</span></div>`;
					}
					raw = raw.slice(0, h1Start) + dateHtml + raw.slice(h1Start);
				}
			}

			this.htmlData = this.sanitizer.bypassSecurityTrustHtml(raw);
		} else {
			this.htmlData = "";
		}
	}
}
