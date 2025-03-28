import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { APP_ROUTES } from "../../app.routing";
import { ALLOWED_ROUTES } from "./nav.constant";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.less"],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavComponent {
  routes = APP_ROUTES.filter((r) => ALLOWED_ROUTES.includes(r.path || ""));
}
