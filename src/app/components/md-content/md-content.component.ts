import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { marked } from "marked";
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

@Component({
	selector: "app-md-content",
	templateUrl: "./md-content.component.html",
	styleUrl: "./md-content.component.css",
	standalone: true,
})
export class MdContentComponent {
	@Input() data = "";
	@Input() category = "";
	@Input() articleName = "";
	@Input() articleDirname = "";
	htmlData: SafeHtml = "";

	constructor(private sanitizer: DomSanitizer) {}

	private stripFrontmatter(md: string): string {
		if (!md.startsWith("---")) return md;
		const end = md.indexOf("\n---", 3);
		if (end === -1) return md;
		return md.slice(end + 4).replace(/^\s+/, "");
	}

	ngOnChanges() {
		if (this.data) {
			const markdown = this.stripFrontmatter(this.data);
			// Use the modern marked API without deprecated options.
			// Create a default Renderer so helper methods like renderer.text exist,
			// then override only the code method to use highlight.js.
			// Use non-deprecated options to avoid console warnings.
			// Note: cast to any because types may not expose Renderer constructor in ESM build.
			// Create a Renderer constructor in a typesafe-ish way (avoid explicit any type annotation).
			const RendererCtor =
				(marked as unknown as { Renderer?: new () => unknown }).Renderer ??
				(marked as unknown as { renderer?: new () => unknown }).renderer ??
				class {};
			// @ts-ignore - the Renderer type is dynamic in ESM builds
			const renderer = new RendererCtor();

			// Provide the code method as an arrow function to satisfy lint rules.
			// @ts-ignore - dynamic method assignment
			renderer.code = (code: string, infostring: string | undefined) => {
				const lang = (infostring || "").trim().split(/\s+/)[0];
				try {
					if (lang && hljs.getLanguage(lang)) {
						return `<pre><code class="hljs language-${lang}">${
							hljs.highlight(code, { language: lang }).value
						}</code></pre>`;
					}
					return `<pre><code class="hljs">${
						hljs.highlightAuto(code).value
					}</code></pre>`;
				} catch (e) {
					return `<pre><code>${code}</code></pre>`;
				}
			};

			// @ts-ignore - dynamic method assignment
			renderer.image = (token: { href: string; title: string; text: string }) => {
				let href = token.href;
				if (this.category && this.articleDirname && !href.startsWith("http")) {
					href = `/assets/articles/${this.category}/${this.articleDirname}/${href}`;
				}
				const title = token.title ? ` title="${token.title}"` : "";
				return `<img src="${href}" alt="${token.text}"${title}>`;
			};

			const raw = marked.parse(markdown, {
				renderer,
				gfm: true,
				breaks: true,
				// disable deprecated behaviors from marked 5
				mangle: false,
				headerIds: false,
			});

			this.htmlData = this.sanitizer.bypassSecurityTrustHtml(raw);
		} else {
			this.htmlData = "";
		}
	}
}
