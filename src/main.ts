import { enableProdMode, importProvidersFrom } from "@angular/core";

import { provideHttpClient } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppComponent } from "./app/app.component";
import { AppRoutingModule } from "./app/app.routing";
import { environment } from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule, AppRoutingModule),
		provideHttpClient(),
		provideAnimations(),
	],
}).catch((err) => console.error(err));

// Runtime diagnostics: detect if Zone has been loaded (helps debug zoneless issues)
try {
	const hasZone =
		typeof (globalThis as unknown as { Zone?: unknown }).Zone !== "undefined";
	if (hasZone) {
		// Helpful info during dev to know Zone.js is present
		// eslint-disable-next-line no-console
		console.info(
			"Zone detected at runtime. Zone is intentionally imported for compatibility.",
		);
	} else {
		// eslint-disable-next-line no-console
		console.info(
			"No Zone detected at runtime (expected for zoneless bootstrap).",
		);
	}
} catch (e) {
	// ignore diagnostics errors
}
