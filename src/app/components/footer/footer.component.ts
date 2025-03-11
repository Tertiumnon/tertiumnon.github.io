import { Component, inject } from "@angular/core";
import { ThemeService } from "../theme/theme.service";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Theme } from "../theme/theme";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"],
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
