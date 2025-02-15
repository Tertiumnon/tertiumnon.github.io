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
    title: "Software",
    loadComponent: () => import("./pages/software/software.component").then((m) => m.SoftwareComponent),
  },
  {
    path: "articles",
    title: "Articles",
    loadComponent: () => import("./pages/articles/articles.component").then((m) => m.ArticlesComponent),
  },
  {
    path: "articles/:category/:name",
    title: "Article",
    loadComponent: () => import("./pages/article/article.component").then((m) => m.ArticleComponent),
  },
  {
    path: "tools/what-time",
    loadComponent: () => import("./pages/what-time/what-time.component").then((m) => m.WhatTimeComponent),
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
