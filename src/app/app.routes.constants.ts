import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
	{
		path: "index",
		title: "Home",
		loadComponent: () =>
			import("./pages/home/home.component").then((m) => m.HomeComponent),
	},
	{ path: "about", redirectTo: "about-me", pathMatch: "full" },
	{
		path: "about-me",
		title: "About me",
		loadComponent: () =>
			import("./pages/about-me/about-me.component").then(
				(m) => m.AboutMeComponent,
			),
	},
	{
		path: "changelog",
		redirectTo: "lines",
		pathMatch: "full",
	},
	{
		path: ":lang/changelog",
		redirectTo: "lines",
		pathMatch: "full",
	},
	{
		path: "lines",
		title: "Lines",
		loadComponent: () =>
			import("./pages/lines/lines.component").then((m) => m.LinesComponent),
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
			import("./pages/posts/posts.component").then((m) => m.PostsComponent),
	},
	{
		path: "projects",
		title: "Projects",
		loadComponent: () =>
			import("./pages/projects/projects.component").then(
				(m) => m.ProjectsComponent,
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
			import(
				"./pages/software--app-port-convention/app-port-convention.component"
			).then((m) => m.AppPortConventionComponent),
	},
	{
		path: "projects/:name",
		redirectTo: "projects/:name/readme",
		pathMatch: "full",
	},
	{
		path: "projects/:name/readme",
		title: "Projects",
		data: { view: "readme" },
		loadComponent: () =>
			import("./pages/software--project/project.component").then(
				(m) => m.ProjectPageComponent,
			),
	},
	...(
		["changelog", "screenshots", "downloads", "license", "links"] as const
	).map((view) => ({
		path: `projects/:name/${view}`,
		title: "Projects",
		data: { view },
		loadComponent: () =>
			import("./pages/software--project/project.component").then(
				(m) => m.ProjectPageComponent,
			),
	})),
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
			import("./pages/post/post.component").then((m) => m.PostComponent),
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
		title: "Life",
		loadComponent: () =>
			import("./pages/life/life.component").then((m) => m.LifeComponent),
	},
	{
		path: "favorite",
		title: "Favorite",
		loadComponent: () =>
			import("./pages/favorite/favorite.component").then(
				(m) => m.FavoriteComponent,
			),
	},
	{
		path: "favorite/books",
		title: "Favorite Books",
		loadComponent: () =>
			import("./pages/favorite-books/favorite-books.component").then(
				(m) => m.FavoriteBooksComponent,
			),
	},
	{ path: "**", redirectTo: "index" },
];
