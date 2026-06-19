import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, ActivatedRoute } from "@angular/router";
import { APP_ROUTES } from "../../app.routing";
import { ALLOWED_ROUTES } from "./nav.constant";

@Component({
	selector: "app-nav",
	standalone: true,
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.css"],
	imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavComponent {
	private route = inject(ActivatedRoute);

	routes = computed(() => {
		const lang = this.route.snapshot.params["lang"] || "en";
		return APP_ROUTES.filter((r) => ALLOWED_ROUTES.includes(r.path || "")).map((r) => ({
			...r,
			path: r.path === ":lang/posts" ? `${lang}/posts` : r.path,
		}));
	});

	getRouterLink(route: any) {
		return [route.path];
	}
}
