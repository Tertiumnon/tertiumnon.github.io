import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { APP_ROUTES } from "./app.routes.constants";

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES, {
			useHash: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
