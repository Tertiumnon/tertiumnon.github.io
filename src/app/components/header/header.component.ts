import { Component } from "@angular/core";
import { NavComponent } from "../nav/nav.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.less"],
	standalone: true,
	imports: [RouterLink, NavComponent, RouterLinkActive],
})
export class HeaderComponent {}
