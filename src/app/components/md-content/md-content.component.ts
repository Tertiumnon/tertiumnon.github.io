import { Component, HostListener, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { marked, Renderer } from "marked";
import hljs from "highlight.js/lib/core";
// register common languages (add more as needed)
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";

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
	@Input() data = "";
	@Input() category = "";
	@Input() postName = "";
	@Input() postDirname = "";
	@Input() postDate = "";
	@Input() lang = "en";
	@Input() showBreadcrumb = false;
	htmlData: SafeHtml = "";
	private renderer = new Renderer();

	constructor(private sanitizer: DomSanitizer) {
		this.renderer.code = (code: string, infostring?: string): string => {
			const language = (infostring || "").trim().split(/\s+/)[0];
			let highlighted: string;
			try {
				highlighted = language && hljs.getLanguage(language)
					? hljs.highlight(code, { language }).value
					: hljs.highlightAuto(code).value;
			} catch (e) {
				highlighted = escapeHtml(code);
			}
			const langClass = language ? ` language-${language}` : "";
			return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>\n`;
		};
	}

	// The app uses hash-based routing (useHash: true), so an in-page anchor
	// like <a href="#key-features"> would otherwise change location.hash,
	// get intercepted by the Router as a navigation, fail to match any route,
	// and redirect away to the home page via the wildcard route. Handle
	// same-page anchors manually instead of letting them hit the Router.
	@HostListener("click", ["$event"])
	onContentClick(event: MouseEvent) {
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

	ngOnChanges() {
		if (this.data) {
			const markdown = this.stripFrontmatter(this.data);

			let raw = marked.parse(markdown, {
				gfm: true,
				breaks: true,
				mangle: false,
				headerIds: true,
				renderer: this.renderer,
			});

			// Fix image paths post-processing
			if (this.category && this.postDirname) {
				raw = raw.replace(/<img\s+src="(?!(?:https?:|\/))([^"]+)"/g,
					`<img src="/assets/posts/${this.postDirname}/$1"`);
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
