import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";
import { DatePipe } from "@angular/common";
import { catchError, of } from "rxjs";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

// A post from the Bluesky account, written by scripts/lines/lines--create.
export interface Line {
	uri: string;
	url: string;
	text: string;
	createdAt: string;
	author: { handle: string; displayName: string; avatar: string };
}

@Component({
	selector: "app-lines",
	standalone: true,
	imports: [DatePipe, PageHeaderComponent],
	templateUrl: "./lines.component.html",
	styleUrl: "./lines.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinesComponent {
	private readonly http = inject(HttpClient);
	readonly lines = toSignal(
		this.http.get<Line[]>("assets/lines.json").pipe(catchError(() => of([] as Line[]))),
		{ initialValue: [] as Line[] },
	);
}
