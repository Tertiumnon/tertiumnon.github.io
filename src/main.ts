import { enableProdMode, importProvidersFrom } from "@angular/core";

import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppComponent } from "./app/app.component";
import { AppRoutingModule } from "./app/app.routing";
import { environment } from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [importProvidersFrom(BrowserModule, AppRoutingModule), provideAnimations()],
}).catch((err) => console.error(err));
