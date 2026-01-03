import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Theme } from "../theme/theme";
import { ThemeService } from "../theme/theme.service";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.css"],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class FooterComponent {
	themeService = inject(ThemeService);
	themeCtrl = new FormControl(this.themeService.theme());

	ngOnInit() {
		this.themeCtrl.valueChanges.subscribe((theme) => {
			this.themeService.setTheme(theme as unknown as Theme);
		});
	}
}
