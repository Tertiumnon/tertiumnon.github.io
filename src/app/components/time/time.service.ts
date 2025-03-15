import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TimeService {
  static createDt(args: { h?: number; m?: number; s?: number }): Date {
    const { h, m, s } = args;
    const dt = new Date();
    dt.setHours(h || 0);
    dt.setMinutes(m || 0);
    dt.setSeconds(s || 0);
    return dt;
  }

  static formatToIsoDate(date: number) {
    return new DatePipe("en-US").transform(date, "YYYY-MM-dd");
  }

  static formatToIsoTime(date: number) {
    return new DatePipe("en-US").transform(date, "HH:mm");
  }

  static timeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static timeZones() {
    return Intl.supportedValuesOf("timeZone");
  }

  static convertTimeZone(dt: Date, timeZone: string) {
    return new Date(dt.toLocaleString("en-US", { timeZone }));
  }
}
