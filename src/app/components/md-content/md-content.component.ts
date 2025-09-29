import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
// register common languages (add more as needed)
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);

@Component({
  selector: 'app-md-content',
  templateUrl: './md-content.component.html',
  styleUrl: './md-content.component.less',
  standalone: true,
})
export class MdContentComponent {
  @Input() data = '';
  htmlData: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.data) {
      // Configure marked to highlight code blocks using highlight.js
      const raw = marked.parse(this.data || '', {
        gfm: true,
        breaks: true,
        highlight: (code: string, lang?: string) => {
          try {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
          } catch (e) {
            return code;
          }
        }
      });
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(raw);
    } else {
      this.htmlData = '';
    }
  }
}
