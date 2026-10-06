import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
export class FooterComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	readonly themeService = inject(ThemeService);
	readonly themeCtrl = new FormControl(this.themeService.theme());

	ngOnInit(): void {
		this.themeCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((theme) => {
				this.themeService.setTheme(theme as Theme);
			});
	}
}
