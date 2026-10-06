import { TimeUtils } from "./time.utils";

export const TimeService = {
	createDt(args: { h?: number; m?: number; s?: number }): Date {
		return TimeUtils.createDt(args);
	},

	formatToIsoDate(date: number): string | null {
		return TimeUtils.formatToIsoDate(date);
	},

	formatToIsoTime(date: number): string | null {
		return TimeUtils.formatToIsoTime(date);
	},

	timeZone(): string {
		return TimeUtils.timeZone();
	},

	timeZones(): string[] {
		return TimeUtils.timeZones();
	},

	convertTimeZone(dt: Date, timeZone: string): Date {
		return TimeUtils.convertTimeZone(dt, timeZone);
	},

	getUtcOffset(timeZone: string, date: Date = new Date()): string {
		return TimeUtils.getUtcOffset(timeZone, date);
	},
};
