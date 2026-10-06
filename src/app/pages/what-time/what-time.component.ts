import { CommonModule, DatePipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	inject,
	input,
	signal,
	DestroyRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { interval, Subscription } from "rxjs";
import { TimeService } from "../../components/time/time.service";

const INTERVAL_MS = 1000;
const MAX_DROPDOWN_ITEMS = 50;

@Component({
	selector: "app-what-time",
	imports: [CommonModule, ReactiveFormsModule, DatePipe],
	templateUrl: "./what-time.component.html",
	styleUrl: "./what-time.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class WhatTimeComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly cdr = inject(ChangeDetectorRef);
	private readonly elementRef = inject(ElementRef);

	readonly TimeService = TimeService;

	// now
	readonly date = signal(new Date());
	readonly isoDate = signal(new Date().toISOString());
	readonly timeZone = input();

	// init date time
	readonly initDateTime = signal(TimeService.createDt({ h: 11 }));
	readonly initDateCtrl = new FormControl(
		TimeService.formatToIsoDate(this.initDateTime().getTime()),
	);
	readonly initTimeCtrl = new FormControl(
		TimeService.formatToIsoTime(this.initDateTime().getTime()),
	);
	readonly initTimeZoneCtrl = new FormControl(TimeService.timeZone());
	readonly initTimeZoneSearchCtrl = new FormControl("");
	readonly filteredInitTimeZones = signal<string[]>([]);
	readonly showInitTimeZoneDropdown = signal(false);
	readonly selectedInitIndex = signal(-1);

	// converted date time
	readonly convertedDateTime = signal<Date | undefined>(undefined);
	readonly convertedDateCtrl = new FormControl();
	readonly convertedTimeCtrl = new FormControl();
	readonly convertedTimeZoneCtrl = new FormControl(this.initTimeZoneCtrl.value);
	readonly convertedTimeZoneSearchCtrl = new FormControl("");
	readonly filteredConvertedTimeZones = signal<string[]>([]);
	readonly showConvertedTimeZoneDropdown = signal(false);
	readonly selectedConvertedIndex = signal(-1);

	private intervalSub: Subscription | null = null;

	ngOnInit(): void {
		this.intervalSub = interval(INTERVAL_MS).subscribe(() => this.setTime());

		this.initDateCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onInitDateChange.bind(this));
		this.initTimeCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onInitTimeChange.bind(this));
		this.initTimeZoneCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onInitTimeZoneChange.bind(this));
		this.convertedTimeZoneCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onConvertedTimeZoneChange.bind(this));
		this.initTimeZoneSearchCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onInitTimeZoneSearch.bind(this));
		this.convertedTimeZoneSearchCtrl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onConvertedTimeZoneSearch.bind(this));

		// Initialize with current timezone value
		this.initTimeZoneSearchCtrl.setValue(
			this.getTimezoneLabel(this.initTimeZoneCtrl.value || ""),
		);
		this.convertedTimeZoneSearchCtrl.setValue(
			this.getTimezoneLabel(this.convertedTimeZoneCtrl.value || ""),
		);
	}

	ngOnDestroy(): void {
		if (this.intervalSub) {
			this.intervalSub.unsubscribe();
			this.intervalSub = null;
		}
	}

	setTime(): void {
		this.date.set(new Date());
		this.isoDate.set(new Date().toISOString());
	}

	onInitDateChange(date: string | null): void {
		if (!date) return;
		const dt = this.initDateTime();
		dt.setFullYear(Number(date.slice(0, 4)));
		dt.setMonth(Number(date.slice(5, 7)) - 1);
		dt.setDate(Number(date.slice(8, 10)));
		this.initDateTime.set(dt);
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}

	onInitTimeChange(time: string | null): void {
		if (!time) return;
		const dt = this.initDateTime();
		dt.setHours(Number(time.slice(0, 2)));
		dt.setMinutes(Number(time.slice(3, 5)));
		this.initDateTime.set(dt);
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}

	onInitTimeZoneChange(tz: string | null): void {
		if (!tz) return;
		this.initDateTime.set(TimeService.convertTimeZone(this.initDateTime(), tz));
		const time = this.initDateTime().getTime();
		this.initDateCtrl.setValue(TimeService.formatToIsoDate(time));
		this.initTimeCtrl.setValue(TimeService.formatToIsoTime(time));
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}

	updateConvertedDateTime(): void {
		const tz = this.convertedTimeZoneCtrl.value;
		if (!tz) return;
		this.convertedDateTime.set(
			TimeService.convertTimeZone(this.initDateTime(), tz),
		);
		const time = this.convertedDateTime()?.getTime();
		if (!time) return;
		this.convertedDateCtrl.setValue(TimeService.formatToIsoDate(time));
		this.convertedTimeCtrl.setValue(TimeService.formatToIsoTime(time));
	}

	onConvertedTimeZoneChange(): void {
		this.updateConvertedDateTime();
	}

	getTimezoneLabel(tz: string): string {
		if (!tz) return "";
		const offset = TimeService.getUtcOffset(tz, this.date());
		return `${tz} (${offset})`;
	}

	onInitTimeZoneSearch(searchTerm: string | null): void {
		this.selectedInitIndex.set(-1);
		if (!searchTerm) {
			this.filteredInitTimeZones.set(TimeService.timeZones().slice(0, MAX_DROPDOWN_ITEMS));
			this.cdr.markForCheck();
			return;
		}
		const term = searchTerm.toLowerCase();
		const filtered = TimeService.timeZones().filter((tz) => {
			const label = this.getTimezoneLabel(tz).toLowerCase();
			return label.includes(term);
		});
		this.filteredInitTimeZones.set(filtered.slice(0, MAX_DROPDOWN_ITEMS));
		this.cdr.markForCheck();
	}

	onConvertedTimeZoneSearch(searchTerm: string | null): void {
		this.selectedConvertedIndex.set(-1);
		if (!searchTerm) {
			this.filteredConvertedTimeZones.set(TimeService.timeZones().slice(0, MAX_DROPDOWN_ITEMS));
			this.cdr.markForCheck();
			return;
		}
		const term = searchTerm.toLowerCase();
		const filtered = TimeService.timeZones().filter((tz) => {
			const label = this.getTimezoneLabel(tz).toLowerCase();
			return label.includes(term);
		});
		this.filteredConvertedTimeZones.set(filtered.slice(0, MAX_DROPDOWN_ITEMS));
		this.cdr.markForCheck();
	}

	selectInitTimeZone(tz: string): void {
		this.initTimeZoneCtrl.setValue(tz);
		this.initTimeZoneSearchCtrl.setValue(this.getTimezoneLabel(tz), {
			emitEvent: false,
		});
		this.showInitTimeZoneDropdown.set(false);
	}

	selectConvertedTimeZone(tz: string): void {
		this.convertedTimeZoneCtrl.setValue(tz);
		this.convertedTimeZoneSearchCtrl.setValue(this.getTimezoneLabel(tz), {
			emitEvent: false,
		});
		this.showConvertedTimeZoneDropdown.set(false);
	}

	onInitTimeZoneFocus(): void {
		this.showInitTimeZoneDropdown.set(true);
		this.selectedInitIndex.set(-1);
		this.initTimeZoneSearchCtrl.setValue("");
		this.filteredInitTimeZones.set(TimeService.timeZones().slice(0, MAX_DROPDOWN_ITEMS));
		this.cdr.markForCheck();
	}

	onConvertedTimeZoneFocus(): void {
		this.showConvertedTimeZoneDropdown.set(true);
		this.selectedConvertedIndex.set(-1);
		this.convertedTimeZoneSearchCtrl.setValue("");
		this.filteredConvertedTimeZones.set(TimeService.timeZones().slice(0, MAX_DROPDOWN_ITEMS));
		this.cdr.markForCheck();
	}

	onInitTimeZoneKeydown(event: KeyboardEvent): void {
		if (!this.showInitTimeZoneDropdown()) return;

		const filtered = this.filteredInitTimeZones();
		const currentIndex = this.selectedInitIndex();

		if (event.key === "Escape") {
			event.preventDefault();
			this.showInitTimeZoneDropdown.set(false);
			this.initTimeZoneSearchCtrl.setValue(
				this.getTimezoneLabel(this.initTimeZoneCtrl.value || ""),
				{ emitEvent: false },
			);
			(event.target as HTMLInputElement).blur();
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			const newIndex =
				currentIndex < filtered.length - 1 ? currentIndex + 1 : 0;
			this.selectedInitIndex.set(newIndex);
			this.scrollToSelectedItem("init");
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			const newIndex =
				currentIndex > 0 ? currentIndex - 1 : filtered.length - 1;
			this.selectedInitIndex.set(newIndex);
			this.scrollToSelectedItem("init");
		} else if (event.key === "Enter" && currentIndex >= 0) {
			event.preventDefault();
			const selectedTz = filtered[currentIndex];
			if (selectedTz) {
				this.selectInitTimeZone(selectedTz);
			}
		}
	}

	onConvertedTimeZoneKeydown(event: KeyboardEvent): void {
		if (!this.showConvertedTimeZoneDropdown()) return;

		const filtered = this.filteredConvertedTimeZones();
		const currentIndex = this.selectedConvertedIndex();

		if (event.key === "Escape") {
			event.preventDefault();
			this.showConvertedTimeZoneDropdown.set(false);
			this.convertedTimeZoneSearchCtrl.setValue(
				this.getTimezoneLabel(this.convertedTimeZoneCtrl.value || ""),
				{ emitEvent: false },
			);
			(event.target as HTMLInputElement).blur();
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			const newIndex =
				currentIndex < filtered.length - 1 ? currentIndex + 1 : 0;
			this.selectedConvertedIndex.set(newIndex);
			this.scrollToSelectedItem("converted");
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			const newIndex =
				currentIndex > 0 ? currentIndex - 1 : filtered.length - 1;
			this.selectedConvertedIndex.set(newIndex);
			this.scrollToSelectedItem("converted");
		} else if (event.key === "Enter" && currentIndex >= 0) {
			event.preventDefault();
			const selectedTz = filtered[currentIndex];
			if (selectedTz) {
				this.selectConvertedTimeZone(selectedTz);
			}
		}
	}

	@HostListener("document:click", ["$event"])
	onDocumentClick(event: MouseEvent): void {
		const target = event.target as HTMLElement;

		// Check if click is inside any timezone search container
		const clickedInTimezoneContainer = target.closest(
			".timezone-search-container",
		);

		if (!clickedInTimezoneContainer) {
			// Close both dropdowns if click is outside any timezone search container
			if (this.showInitTimeZoneDropdown()) {
				this.showInitTimeZoneDropdown.set(false);
				// Restore the selected timezone label
				this.initTimeZoneSearchCtrl.setValue(
					this.getTimezoneLabel(this.initTimeZoneCtrl.value || ""),
					{ emitEvent: false },
				);
			}
			if (this.showConvertedTimeZoneDropdown()) {
				this.showConvertedTimeZoneDropdown.set(false);
				// Restore the selected timezone label
				this.convertedTimeZoneSearchCtrl.setValue(
					this.getTimezoneLabel(this.convertedTimeZoneCtrl.value || ""),
					{ emitEvent: false },
				);
			}
		}
	}

	scrollToSelectedItem(type: "init" | "converted"): void {
		// Scroll the selected item into view
		setTimeout(() => {
			const dropdown = this.elementRef.nativeElement.querySelector(
				type === "init"
					? '.timezone-dropdown:has(~ input[name="timeZoneSearch"])'
					: '.timezone-dropdown:has(~ input[name="convertedTimeZoneSearch"])',
			);
			if (!dropdown) return;

			const activeItem = dropdown.querySelector(".timezone-option.active");
			if (activeItem) {
				activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
			}
		}, 0);
	}

	setToNow(): void {
		const now = new Date();
		this.initDateTime.set(now);
		this.initDateCtrl.setValue(TimeService.formatToIsoDate(now.getTime()));
		this.initTimeCtrl.setValue(TimeService.formatToIsoTime(now.getTime()));
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}
}
