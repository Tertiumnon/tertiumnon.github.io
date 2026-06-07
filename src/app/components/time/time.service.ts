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
		return new DatePipe("en-US").transform(date, "yyyy-MM-dd");
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
		// Use Intl.DateTimeFormat to get the correct time parts in the target timezone
		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone: timeZone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});

		const parts = formatter.formatToParts(dt);
		const getValue = (type: string) =>
			parts.find((p) => p.type === type)?.value || "00";

		// Construct an ISO string and create a new Date
		// This creates a Date that represents the local time in the target timezone
		const isoString = `${getValue("year")}-${getValue("month")}-${getValue(
			"day",
		)}T${getValue("hour")}:${getValue("minute")}:${getValue("second")}`;
		return new Date(isoString);
	},

	getUtcOffset(timeZone: string, date: Date = new Date()): string {
		// Get the UTC offset for a specific timezone at a given date
		// This accounts for DST changes
		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone: timeZone,
			timeZoneName: "longOffset",
		});

		const parts = formatter.formatToParts(date);
		const offsetPart = parts.find((p) => p.type === "timeZoneName");

		if (offsetPart?.value) {
			// Parse the offset like "GMT-05:00" or "GMT+09:00"
			const match = offsetPart.value.match(/GMT([+-]\d{2}):?(\d{2})?/);
			if (match) {
				const hours = match[1];
				const minutes = match[2] || "00";
				return minutes === "00" ? `UTC${hours}` : `UTC${hours}:${minutes}`;
			}
		}

		// Fallback: calculate offset manually
		const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
		const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
		const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
		const hours = Math.floor(Math.abs(offset));
		const minutes = Math.round((Math.abs(offset) - hours) * 60);
		const sign = offset >= 0 ? "+" : "-";
		return minutes > 0
			? `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`
			: `UTC${sign}${hours}`;
	},
};
