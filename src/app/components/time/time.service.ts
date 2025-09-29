import { DatePipe } from "@angular/common";

export const TimeService = {
	createDt(args: { h?: number; m?: number; s?: number }): Date {
		const { h, m, s } = args;
		const dt = new Date();
		dt.setHours(h || 0);
		dt.setMinutes(m || 0);
		dt.setSeconds(s || 0);
		return dt;
	},

	formatToIsoDate(date: number): string | null {
		return new DatePipe("en-US").transform(date, "YYYY-MM-dd");
	},

	formatToIsoTime(date: number): string | null {
		return new DatePipe("en-US").transform(date, "HH:mm");
	},

	timeZone(): string {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	},

	timeZones(): string[] {
		return Intl.supportedValuesOf("timeZone");
	},

	convertTimeZone(dt: Date, timeZone: string): Date {
		return new Date(dt.toLocaleString("en-US", { timeZone }));
	},
};
