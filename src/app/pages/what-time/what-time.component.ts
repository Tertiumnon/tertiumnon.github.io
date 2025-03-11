import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { TimeService } from '../../components/time/time.service';

@Component({
  selector: 'app-what-time',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './what-time.component.html',
  styleUrl: './what-time.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatTimeComponent {
  TimeService = TimeService;
  cdr = inject(ChangeDetectorRef);
  // now
  date = signal(new Date());
  isoDate = signal(new Date().toISOString());
  timeZone = input();
  // date converter
  initDt = signal(TimeService.createDt({ h: 11 }));
  initDateCtrl = new FormControl(
    TimeService.formatToIsoDate(this.initDt().getTime()),
  );
  initTimeCtrl = new FormControl(
    TimeService.formatToIsoTime(this.initDt().getTime()),
  );
  initTzCtrl = new FormControl(TimeService.timeZone());
  initTzOffset = signal(0);
  computedDateCtrl = new FormControl();
  computedTimeCtrl = new FormControl();
  computedTzCtrl = new FormControl(this.initTzCtrl);
  // interval
  interval$ = interval(1000);
  intervalSub = this.interval$.subscribe(this.setTime.bind(this));

  ngOnInit() {
    console.log(this.initDt());
    this.initTzCtrl.valueChanges.subscribe(this.changeInitTz.bind(this));
  }

  ngOnDestroy() {
    this.intervalSub.unsubscribe();
  }

  setTime() {
    this.date.set(new Date());
    this.isoDate.set(new Date().toISOString());
  }

  changeInitTz(tz: string | null) {
    if (!tz) return;
    this.initDt.set(TimeService.convertTimeZone(this.initDt(), tz));
    console.log(this.initDt());
  }

  setComputedDateTime(date: number) {
    // this.computedDateCtrl.setValue(this.formatDateTimeToDate(date));
    // this.computedTimeCtrl.setValue(this.formatDateTimeToTime(date));
  }

  onConvertBtnClick() {
    // const dateStr = this.dateCtrl.value?.toString() || '';
    // console.log(dateStr);
    // let newDate = this.timeScv.convertToTimezone(
    //   new Date(dateStr),
    //   this.timezoneCtrl.value || '',
    // );
    // console.log(newDate);
    // const dateArr = (this.dateCtrl.value?.toString() || '').split('-');
    // newDate.setFullYear(Number(dateArr[0]));
    // newDate.setMonth(Number(dateArr[1]) - 1);
    // newDate.setDate(Number(dateArr[2]));
    // const timeStr = this.timeCtrl.value?.toString() || '';
    // newDate.setHours(Number(timeStr.slice(0, 2)));
    // newDate.setMinutes(Number(timeStr.slice(3, 5)));
    // newDate.setSeconds(0);
    // newDate = this.timeScv.convertToTimezone(
    //   newDate,
    //   this.calculatedTimezoneCtrl.value || '',
    // );
    // this.setCalculatedDateTime(newDate.getTime());
  }
}
