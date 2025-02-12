import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  timezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  timezones() {
    return Intl.supportedValuesOf('timeZone');
  }

  convertToTimezone(date: Date, timeZone: string) {
    return new Date((date).toLocaleString("en-US", { timeZone }))
  }
}
