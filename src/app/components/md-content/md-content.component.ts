import { Component, Input } from "@angular/core";
import * as showdown from "showdown";

@Component({
  selector: "app-md-content",
  standalone: true,
  imports: [],
  templateUrl: "./md-content.component.html",
  styleUrl: "./md-content.component.less",
})
export class MdContentComponent {
  @Input() data = "";
  htmlData = "";
  converter: showdown.Converter | undefined;

  ngOnInit() {
    this.converter = new showdown.Converter();
  }

  ngOnChanges() {
    if (this.data) this.htmlData = this.converter?.makeHtml(this.data) || "";
  }
}
