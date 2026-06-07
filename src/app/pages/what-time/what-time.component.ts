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
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { interval } from "rxjs";
import { TimeService } from "../../components/time/time.service";

@Component({
	selector: "app-what-time",
	imports: [CommonModule, ReactiveFormsModule, DatePipe],
	templateUrl: "./what-time.component.html",
	styleUrl: "./what-time.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class WhatTimeComponent {
	TimeService = TimeService;
	cdr = inject(ChangeDetectorRef);
	elementRef = inject(ElementRef);
	// now
	date = signal(new Date());
	isoDate = signal(new Date().toISOString());
	timeZone = input();
	// init date time
	initDateTime = signal(TimeService.createDt({ h: 11 }));
	initDateCtrl = new FormControl(
		TimeService.formatToIsoDate(this.initDateTime().getTime()),
	);
	initTimeCtrl = new FormControl(
		TimeService.formatToIsoTime(this.initDateTime().getTime()),
	);
	initTimeZoneCtrl = new FormControl(TimeService.timeZone());
	initTimeZoneSearchCtrl = new FormControl("");
	filteredInitTimeZones = signal<string[]>([]);
	showInitTimeZoneDropdown = signal(false);
	selectedInitIndex = signal(-1);
	// converted date time
	convertedDateTime = signal<Date | undefined>(undefined);
	convertedDateCtrl = new FormControl();
	convertedTimeCtrl = new FormControl();
	convertedTimeZoneCtrl = new FormControl(this.initTimeZoneCtrl.value);
	convertedTimeZoneSearchCtrl = new FormControl("");
	filteredConvertedTimeZones = signal<string[]>([]);
	showConvertedTimeZoneDropdown = signal(false);
	selectedConvertedIndex = signal(-1);
	// interval
	interval$ = interval(1000);
	intervalSub = this.interval$.subscribe(this.setTime.bind(this));

	ngOnInit() {
		this.initDateCtrl.valueChanges.subscribe(this.onInitDateChange.bind(this));
		this.initTimeCtrl.valueChanges.subscribe(this.onInitTimeChange.bind(this));
		this.initTimeZoneCtrl.valueChanges.subscribe(
			this.onInitTimeZoneChange.bind(this),
		);
		this.convertedTimeZoneCtrl.valueChanges.subscribe(
			this.onConvertedTimeZoneChange.bind(this),
		);
		this.initTimeZoneSearchCtrl.valueChanges.subscribe(
			this.onInitTimeZoneSearch.bind(this),
		);
		this.convertedTimeZoneSearchCtrl.valueChanges.subscribe(
			this.onConvertedTimeZoneSearch.bind(this),
		);
		// Initialize with current timezone value
		this.initTimeZoneSearchCtrl.setValue(
			this.getTimezoneLabel(this.initTimeZoneCtrl.value || ""),
		);
		this.convertedTimeZoneSearchCtrl.setValue(
			this.getTimezoneLabel(this.convertedTimeZoneCtrl.value || ""),
		);
	}

	ngOnDestroy() {
		this.intervalSub.unsubscribe();
	}

	setTime() {
		this.date.set(new Date());
		this.isoDate.set(new Date().toISOString());
	}

	onInitDateChange(date: string | null) {
		if (!date) return;
		const dt = this.initDateTime();
		dt.setFullYear(Number(date.slice(0, 4)));
		dt.setMonth(Number(date.slice(5, 7)) - 1);
		dt.setDate(Number(date.slice(8, 10)));
		this.initDateTime.set(dt);
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}

	onInitTimeChange(time: string | null) {
		if (!time) return;
		const dt = this.initDateTime();
		dt.setHours(Number(time.slice(0, 2)));
		dt.setMinutes(Number(time.slice(3, 5)));
		this.initDateTime.set(dt);
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}

	onInitTimeZoneChange(tz: string | null) {
		if (!tz) return;
		this.initDateTime.set(TimeService.convertTimeZone(this.initDateTime(), tz));
		const time = this.initDateTime().getTime();
		this.initDateCtrl.setValue(TimeService.formatToIsoDate(time));
		this.initTimeCtrl.setValue(TimeService.formatToIsoTime(time));
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}

	updateConvertedDateTime() {
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

	onConvertedTimeZoneChange() {
		this.updateConvertedDateTime();
	}

	getTimezoneLabel(tz: string): string {
		if (!tz) return "";
		const offset = TimeService.getUtcOffset(tz, this.date());
		return `${tz} (${offset})`;
	}

	onInitTimeZoneSearch(searchTerm: string | null) {
		this.selectedInitIndex.set(-1); // Reset selection when search changes
		if (!searchTerm) {
			// Show all timezones when search is empty
			this.filteredInitTimeZones.set(TimeService.timeZones().slice(0, 50));
			this.cdr.markForCheck();
			return;
		}
		const term = searchTerm.toLowerCase();
		const filtered = TimeService.timeZones().filter((tz) => {
			const label = this.getTimezoneLabel(tz).toLowerCase();
			return label.includes(term);
		});
		this.filteredInitTimeZones.set(filtered.slice(0, 50)); // Limit to 50 results
		this.cdr.markForCheck();
	}

	onConvertedTimeZoneSearch(searchTerm: string | null) {
		this.selectedConvertedIndex.set(-1); // Reset selection when search changes
		if (!searchTerm) {
			// Show all timezones when search is empty
			this.filteredConvertedTimeZones.set(TimeService.timeZones().slice(0, 50));
			this.cdr.markForCheck();
			return;
		}
		const term = searchTerm.toLowerCase();
		const filtered = TimeService.timeZones().filter((tz) => {
			const label = this.getTimezoneLabel(tz).toLowerCase();
			return label.includes(term);
		});
		this.filteredConvertedTimeZones.set(filtered.slice(0, 50)); // Limit to 50 results
		this.cdr.markForCheck();
	}

	selectInitTimeZone(tz: string) {
		this.initTimeZoneCtrl.setValue(tz);
		this.initTimeZoneSearchCtrl.setValue(this.getTimezoneLabel(tz), {
			emitEvent: false,
		});
		this.showInitTimeZoneDropdown.set(false);
	}

	selectConvertedTimeZone(tz: string) {
		this.convertedTimeZoneCtrl.setValue(tz);
		this.convertedTimeZoneSearchCtrl.setValue(this.getTimezoneLabel(tz), {
			emitEvent: false,
		});
		this.showConvertedTimeZoneDropdown.set(false);
	}

	onInitTimeZoneFocus() {
		this.showInitTimeZoneDropdown.set(true);
		this.selectedInitIndex.set(-1);
		this.initTimeZoneSearchCtrl.setValue("");
		// Show all timezones initially (up to limit)
		this.filteredInitTimeZones.set(TimeService.timeZones().slice(0, 50));
		this.cdr.markForCheck();
	}

	onConvertedTimeZoneFocus() {
		this.showConvertedTimeZoneDropdown.set(true);
		this.selectedConvertedIndex.set(-1);
		this.convertedTimeZoneSearchCtrl.setValue("");
		// Show all timezones initially (up to limit)
		this.filteredConvertedTimeZones.set(TimeService.timeZones().slice(0, 50));
		this.cdr.markForCheck();
	}

	onInitTimeZoneKeydown(event: KeyboardEvent) {
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

	onConvertedTimeZoneKeydown(event: KeyboardEvent) {
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
	onDocumentClick(event: MouseEvent) {
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

	scrollToSelectedItem(type: "init" | "converted") {
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

	setToNow() {
		const now = new Date();
		this.initDateTime.set(now);
		this.initDateCtrl.setValue(TimeService.formatToIsoDate(now.getTime()));
		this.initTimeCtrl.setValue(TimeService.formatToIsoTime(now.getTime()));
		if (this.convertedDateTime()) this.updateConvertedDateTime();
	}
}
