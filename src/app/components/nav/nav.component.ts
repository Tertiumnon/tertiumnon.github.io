import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.less"],
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavComponent {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((result) => result.matches));

	constructor(private breakpointObserver: BreakpointObserver) {}
}
