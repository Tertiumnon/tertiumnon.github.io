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
	@Input() postName = "";
	@Input() postDirname = "";
	@Input() postDate = "";
	@Input() lang = "en";
	@Input() showBreadcrumb = false;
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

			let raw = marked.parse(markdown, {
				gfm: true,
				breaks: true,
				mangle: false,
				headerIds: false,
			});

			// Fix image paths post-processing
			if (this.category && this.postDirname) {
				raw = raw.replace(/<img\s+src="(?!(?:https?:|\/))([^"]+)"/g,
					`<img src="/assets/posts/${this.postDirname}/$1"`);
			}

			// Add syntax highlighting to code blocks
			raw = raw.replace(/<code[^>]*>([^<]*)<\/code>/g, (match: string, code: string) => {
				try {
					const highlighted = hljs.highlightAuto(code).value;
					return `<code class="hljs">${highlighted}</code>`;
				} catch (e) {
					return match;
				}
			});

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
