import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
	{
		path: "index",
		loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent),
	},
	{
		path: "about",
		loadComponent: () => import("./pages/about/about.component").then((m) => m.AboutComponent),
	},
	{
		path: "software",
		loadComponent: () => import("./pages/software/software.component").then((m) => m.SoftwareComponent),
	},
	{
		path: "life",
		loadComponent: () => import("./pages/life/life.component").then((m) => m.LifeComponent),
	},
	{
		path: "favorite",
		loadComponent: () => import("./pages/favorite/favorite.component").then((m) => m.FavoriteComponent),
	},
	{
		path: "favorite/books",
		loadComponent: () =>
			import("./pages/favorite-books/favorite-books.component").then((m) => m.FavoriteBooksComponent),
	},
	{ path: "**", redirectTo: "index" },
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES, {
			useHash: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
