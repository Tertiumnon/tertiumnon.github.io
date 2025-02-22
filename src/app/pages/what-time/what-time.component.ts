import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { ContentComponent } from '../../components/content/content.component';
import { TimeService } from '../../components/time/time.service';

@Component({
  selector: 'app-what-time',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContentComponent, DatePipe],
  templateUrl: './what-time.component.html',
  styleUrl: './what-time.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatTimeComponent {
  cdr = inject(ChangeDetectorRef);
  timeScv = inject(TimeService);
  // now
  date = signal(new Date());
  isoDate = signal(new Date().toISOString());
  timezone = input();
  // date converter
  dateCtrl = new FormControl(this.formatDateTimeToDate(Date.now()));
  timeCtrl = new FormControl("11:00");
  timezoneCtrl = new FormControl(this.timeScv.timezone());
  calculatedDateCtrl = new FormControl();
  calculatedTimeCtrl = new FormControl();
  calculatedTimezoneCtrl = new FormControl(this.timeScv.timezone());
  // interval
  interval$ = interval(1000);
  intervalSub = this.interval$.subscribe(this.setTime.bind(this));

  setTime() {
    this.date.set(new Date());
    this.isoDate.set(new Date().toISOString());
    this.cdr.detectChanges();
  }

  formatDateTimeToDate(date: number) {
    return new DatePipe('en-US').transform(date, 'YYYY-MM-dd');
  }

  formatDateTimeToTime(date: number) {
    return new DatePipe('en-US').transform(date, 'HH:mm');
  }

  setCalculatedDateTime(date: number) {
    this.calculatedDateCtrl.setValue(this.formatDateTimeToDate(date));
    this.calculatedTimeCtrl.setValue(this.formatDateTimeToTime(date));
  }

  onConvertBtnClick() {
    const dateStr = (this.dateCtrl.value?.toString() || "");
    let newDate = this.timeScv.convertToTimezone(new Date(dateStr), this.timezoneCtrl.value || "");
    const dateArr = (this.dateCtrl.value?.toString() || "").split("-");
    newDate.setFullYear(Number(dateArr[0]));
    newDate.setMonth(Number(dateArr[1]) - 1);
    newDate.setDate(Number(dateArr[2]));
    const timeStr = this.timeCtrl.value?.toString() || "";
    newDate.setHours(Number(timeStr.slice(0, 2)));
    newDate.setMinutes(Number(timeStr.slice(3, 5)));
    newDate.setSeconds(0);
    newDate = this.timeScv.convertToTimezone(newDate, this.calculatedTimezoneCtrl.value || "");
    this.setCalculatedDateTime(newDate.getTime());
  }

  ngOnDestroy() {
    this.intervalSub.unsubscribe();
  }
}
