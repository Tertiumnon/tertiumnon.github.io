import { Component, inject } from "@angular/core";
import { EditorTabsService } from "./editor-tabs.service";

@Component({
	selector: "app-editor-tabs",
	standalone: true,
	templateUrl: "./editor-tabs.component.html",
	styleUrl: "./editor-tabs.component.css",
})
export class EditorTabsComponent {
	readonly tabsService = inject(EditorTabsService);
}
