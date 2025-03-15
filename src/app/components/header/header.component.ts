import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
  standalone: true,
  imports: [RouterLink, NavComponent, RouterLinkActive],
})
export class HeaderComponent {}
