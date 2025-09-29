import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: "app-md-content",
  templateUrl: "./md-content.component.html",
  styleUrl: "./md-content.component.less"
})
export class MdContentComponent {
  @Input() data = "";
  htmlData: SafeHtml = "";

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.data) {
      const raw = marked.parse(this.data || '');
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(raw);
    } else {
      this.htmlData = '';
    }
  }
}
