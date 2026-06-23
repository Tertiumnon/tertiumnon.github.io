import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { ThemeService } from "./theme.service";
import { Theme } from "./theme";

describe("ThemeService", () => {
	beforeEach(() => {
		localStorage.clear();
		TestBed.configureTestingModule({});
	});

	it("defaults to Coder theme when localStorage is empty", () => {
		const service = TestBed.inject(ThemeService);
		expect(service.theme()).toBe(Theme.Coder);
	});

	it("restores theme from localStorage", () => {
		localStorage.setItem("theme", Theme.HoneyPie);
		const service = TestBed.inject(ThemeService);
		expect(service.theme()).toBe(Theme.HoneyPie);
	});

	it("setTheme updates the signal and persists to localStorage", () => {
		const service = TestBed.inject(ThemeService);
		service.setTheme(Theme.HoneyPie);
		expect(service.theme()).toBe(Theme.HoneyPie);
		expect(localStorage.getItem("theme")).toBe(Theme.HoneyPie);
	});

	it("exposes all available themes", () => {
		const service = TestBed.inject(ThemeService);
		expect(service.themes).toContain(Theme.Coder);
		expect(service.themes).toContain(Theme.HoneyPie);
	});
});
