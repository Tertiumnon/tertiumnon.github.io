import { Component } from "@angular/core";
import { NavComponent } from "../nav/nav.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"],
    standalone: true,
    imports: [RouterLink, NavComponent]
})
export class HeaderComponent {}
