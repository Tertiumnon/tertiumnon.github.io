import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
	{
		path: "index",
		loadComponent: () =>
			import("./pages/home/home.component").then((m) => m.HomeComponent),
	},
	{
		path: "about",
		loadComponent: () =>
			import("./pages/contact/contact.component").then(
				(m) => m.ContactComponent,
			),
	},
	{
		path: "software",
		title: "Software",
		loadComponent: () =>
			import("./pages/software/software.component").then(
				(m) => m.SoftwareComponent,
			),
	},
	{
		path: "news",
		title: "News",
		redirectTo: "en/news",
		pathMatch: "full",
	},
	{
		path: ":lang/news",
		title: "News",
		loadComponent: () =>
			import("./pages/news/news.component").then(
				(m) => m.NewsComponent,
			),
	},
	{
		path: "posts",
		title: "Posts",
		redirectTo: "en/posts",
		pathMatch: "full",
	},
	{
		path: ":lang/posts",
		title: "Posts",
		loadComponent: () =>
			import("./pages/posts/posts.component").then(
				(m) => m.PostsComponent,
			),
	},
	{
		path: ":lang/posts/:name",
		title: "Post",
		loadComponent: () =>
			import("./pages/post/post.component").then(
				(m) => m.PostComponent,
			),
	},
	{
		path: "tools/what-time",
		title: "What Time",
		loadComponent: () =>
			import("./pages/what-time/what-time.component").then(
				(m) => m.WhatTimeComponent,
			),
	},
	{
		path: "life",
		loadComponent: () =>
			import("./pages/life/life.component").then((m) => m.LifeComponent),
	},
	{
		path: "favorite",
		loadComponent: () =>
			import("./pages/favorite/favorite.component").then(
				(m) => m.FavoriteComponent,
			),
	},
	{
		path: "favorite/books",
		loadComponent: () =>
			import("./pages/favorite-books/favorite-books.component").then(
				(m) => m.FavoriteBooksComponent,
			),
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
