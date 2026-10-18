import { Routes } from "@angular/router";

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
		path: "changelog",
		title: "Changelog",
		redirectTo: "en/changelog",
		pathMatch: "full",
	},
	{
		path: ":lang/changelog",
		title: "Changelog",
		loadComponent: () =>
			import("./pages/changelog/changelog.component").then(
				(m) => m.ChangelogComponent,
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
		path: "projects",
		title: "Projects",
		loadComponent: () =>
			import("./pages/software/software.component").then(
				(m) => m.SoftwareComponent,
			),
	},
	{
		path: "tools",
		title: "Tools",
		loadComponent: () =>
			import("./pages/tools/tools.component").then((m) => m.ToolsComponent),
	},
	{
		path: "projects/app-port-convention",
		title: "App Port Convention",
		loadComponent: () =>
			import("./pages/software--app-port-convention/app-port-convention.component").then(
				(m) => m.AppPortConventionComponent,
			),
	},
	{
		path: "projects/:name",
		title: "Projects",
		loadComponent: () =>
			import("./pages/software--project/project.component").then(
				(m) => m.ProjectPageComponent,
			),
	},
	{
		path: ":lang/posts/404",
		title: "Post Not Found",
		loadComponent: () =>
			import("./pages/post-404/post-404.component").then(
				(m) => m.Post404Component,
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
