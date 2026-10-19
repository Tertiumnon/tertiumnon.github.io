import { Injectable, signal } from "@angular/core";

export type SoundName = "move" | "select" | "back" | "power" | "modem" | "catch" | "heart" | "miss" | "hit" | "over" | "win";

// One tone: frequency in Hz, length in ms, waveform, and when it starts relative to the sound's start.
type Tone = { freq: number; ms: number; wave?: OscillatorType; at?: number };

// Chiptune-style effects, synthesised with Web Audio: no sound files to load.
const SOUNDS: Record<SoundName, Tone[]> = {
	move: [{ freq: 880, ms: 30, wave: "square" }],
	select: [
		{ freq: 660, ms: 50, wave: "square" },
		{ freq: 990, ms: 90, wave: "square", at: 50 },
	],
	back: [
		{ freq: 440, ms: 60, wave: "square" },
		{ freq: 330, ms: 90, wave: "square", at: 60 },
	],
	power: [
		{ freq: 1200, ms: 40, wave: "square" },
		{ freq: 1800, ms: 60, wave: "square", at: 40 },
	],
	// Dial-up modem: a buzz, then the handshake beeps.
	modem: [
		{ freq: 120, ms: 500, wave: "sawtooth" },
		{ freq: 2100, ms: 80, wave: "square", at: 500 },
		{ freq: 1200, ms: 80, wave: "square", at: 600 },
		{ freq: 2400, ms: 120, wave: "square", at: 700 },
	],
	catch: [
		{ freq: 1046, ms: 50, wave: "square" },
		{ freq: 1318, ms: 70, wave: "square", at: 50 },
	],
	heart: [
		{ freq: 784, ms: 60, wave: "triangle" },
		{ freq: 1175, ms: 100, wave: "triangle", at: 60 },
	],
	miss: [{ freq: 196, ms: 180, wave: "sawtooth" }],
	hit: [
		{ freq: 523, ms: 40, wave: "square" },
		{ freq: 262, ms: 60, wave: "square", at: 40 },
	],
	over: [
		{ freq: 392, ms: 160, wave: "square" },
		{ freq: 330, ms: 160, wave: "square", at: 160 },
		{ freq: 262, ms: 320, wave: "square", at: 320 },
	],
	win: [
		{ freq: 523, ms: 100, wave: "square" },
		{ freq: 659, ms: 100, wave: "square", at: 100 },
		{ freq: 784, ms: 100, wave: "square", at: 200 },
		{ freq: 1046, ms: 300, wave: "square", at: 300 },
	],
};

const STORAGE_KEY = "sound";
const VOLUME = 0.08;

@Injectable({
	providedIn: "root",
})
export class SoundService {
	readonly muted = signal(this.getStoredMuted());
	private context?: AudioContext;

	toggleMuted(): void {
		this.muted.update((muted) => !muted);
		try {
			localStorage.setItem(STORAGE_KEY, this.muted() ? "off" : "on");
		} catch {
			// Storage access denied or unavailable
		}
	}

	// Browsers allow audio only after a user gesture, so the context is created on the first sound.
	play(name: SoundName): void {
		if (this.muted() || typeof AudioContext === "undefined") return;
		this.context ??= new AudioContext();
		const context = this.context;
		if (context.state === "suspended") void context.resume();
		const start = context.currentTime;
		for (const tone of SOUNDS[name]) {
			const oscillator = context.createOscillator();
			const gain = context.createGain();
			const from = start + (tone.at ?? 0) / 1000;
			const to = from + tone.ms / 1000;
			oscillator.type = tone.wave ?? "square";
			oscillator.frequency.setValueAtTime(tone.freq, from);
			// A short fade-out at the end of each tone, so the notes do not click.
			gain.gain.setValueAtTime(VOLUME, from);
			gain.gain.linearRampToValueAtTime(0, to);
			oscillator.connect(gain).connect(context.destination);
			oscillator.start(from);
			oscillator.stop(to + 0.01);
		}
	}

	private getStoredMuted(): boolean {
		try {
			return localStorage.getItem(STORAGE_KEY) === "off";
		} catch {
			return false;
		}
	}
}
