// Zoneless testing setup for Angular 19+ without zone.js
import { getTestBed } from "@angular/core/testing";
import {
	BrowserTestingModule,
	platformBrowserTesting,
} from "@angular/platform-browser/testing";

getTestBed().initTestEnvironment(
	BrowserTestingModule,
	platformBrowserTesting(),
	{
		teardown: { destroyAfterEach: true },
	},
);
