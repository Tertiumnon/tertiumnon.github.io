import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class EmulatorService {
	private _lines$ = new BehaviorSubject<string[]>([]);
	public isVisible$ = new BehaviorSubject<boolean>(false);
	public isCliEnabled$ = new BehaviorSubject<boolean>(true);
	public command$ = new BehaviorSubject<string>("");

	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) this.clear();
		});

		this._lines$.subscribe((lines) => {
			this.isVisible$.next(lines.length > 0);
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
					"software -> navigate to software",
				];
				break;
			case "clear":
				this.lines = [];
				break;
			case "home":
				this.lines = [];
				this.router.navigate([""], { skipLocationChange: true });
				break;
			case "about":
				this.lines = [];
				this.router.navigate(["about"], { skipLocationChange: true });
				break;
			case "software":
				this.lines = [];
				this.router.navigate(["software"], { skipLocationChange: true });
				break;
		}
		this.command$.next("");
	}
}
