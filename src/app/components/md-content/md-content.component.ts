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
	styleUrl: "./md-content.component.less",
	standalone: true,
})
export class MdContentComponent {
	@Input() data = "";
	htmlData: SafeHtml = "";

	constructor(private sanitizer: DomSanitizer) {}

	ngOnChanges() {
		if (this.data) {
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

			const raw = marked.parse(this.data || "", {
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
