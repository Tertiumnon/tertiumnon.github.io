import { CommonModule, DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { interval } from "rxjs";
import { TimeService } from "../../components/time/time.service";

@Component({
    selector: "app-what-time",
    imports: [CommonModule, ReactiveFormsModule, DatePipe],
    templateUrl: "./what-time.component.html",
    styleUrl: "./what-time.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatTimeComponent {
  TimeService = TimeService;
  cdr = inject(ChangeDetectorRef);
  // now
  date = signal(new Date());
  isoDate = signal(new Date().toISOString());
  timeZone = input();
  // init date time
  initDateTime = signal(TimeService.createDt({ h: 11 }));
  initDateCtrl = new FormControl(TimeService.formatToIsoDate(this.initDateTime().getTime()));
  initTimeCtrl = new FormControl(TimeService.formatToIsoTime(this.initDateTime().getTime()));
  initTimeZoneCtrl = new FormControl(TimeService.timeZone());
  // converted date time
  convertedDateTime = signal<Date | undefined>(undefined);
  convertedDateCtrl = new FormControl();
  convertedTimeCtrl = new FormControl();
  convertedTimeZoneCtrl = new FormControl(this.initTimeZoneCtrl);
  // interval
  interval$ = interval(1000);
  intervalSub = this.interval$.subscribe(this.setTime.bind(this));

  ngOnInit() {
    this.initDateCtrl.valueChanges.subscribe(this.onInitDateChange.bind(this));
    this.initTimeCtrl.valueChanges.subscribe(this.onInitTimeChange.bind(this));
    this.initTimeZoneCtrl.valueChanges.subscribe(this.onInitTimeZoneChange.bind(this));
    this.convertedTimeZoneCtrl.valueChanges.subscribe(this.onConvertedTimeZoneChange.bind(this));
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
    this.convertedDateTime.set(TimeService.convertTimeZone(this.initDateTime(), tz));
    const time = this.convertedDateTime()?.getTime();
    if (!time) return;
    this.convertedDateCtrl.setValue(TimeService.formatToIsoDate(time));
    this.convertedTimeCtrl.setValue(TimeService.formatToIsoTime(time));
  }

  onConvertedTimeZoneChange() {
    this.updateConvertedDateTime();
  }
}
