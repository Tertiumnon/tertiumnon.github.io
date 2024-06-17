import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.less"],
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavComponent {}
