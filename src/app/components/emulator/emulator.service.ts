import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmulatorService {
  private _lines$ = new BehaviorSubject<string[]>([]);
  public isCliEnabled$ = new BehaviorSubject<boolean>(true);
  public command$ = new BehaviorSubject<string>("");

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.clear();
    });
  }

  set lines(lines: string[]) {
    this._lines$.next(lines);
  }

  get lines(): Observable<string[]> {
    return this._lines$.asObservable();
  }

  add(line: string): void {
    if (!line) return;
    const lines = structuredClone(this._lines$.value);
    lines.push(line);
    this._lines$.next(lines);
  }

  clear(): void {
    this.command$.next("");
    this._lines$.next([]);
  }

  enter(command: string): void {
    this.add(command);
    switch (command) {
      case "help":
        this.lines = [
          "clear -> clear all lines",
          "home -> navigate to home",
          "about -> navigate to about",
          "projects -> navigate to projects",
        ];
        break;
      case "clear":
        this.lines = [];
        break;
      case "home":
        this.lines = [];
        this.router.navigate([""], {skipLocationChange: true});
        break;
      case "about":
        this.lines = [];
        this.router.navigate(["about"], {skipLocationChange: true});
        break;
      case "projects":
        this.lines = [];
        this.router.navigate(["projects"], {skipLocationChange: true});
        break;
    }
    this.command$.next("");
  }
}
