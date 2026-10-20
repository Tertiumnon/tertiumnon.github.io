import {
	Component,
	computed,
	ElementRef,
	HostListener,
	inject,
	signal,
	viewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import {
	SelectFieldComponent,
	SelectOption,
} from "../form/select-field.component";
import { TextareaFieldComponent } from "../form/textarea-field.component";
import { runInSandbox, SandboxEvent } from "./sandbox-runner";
import { TerminalService } from "./terminal.service";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

type Language = "javascript" | "typescript";

interface OutputLine {
	level: string;
	text: string;
}

const TIMEOUT_MS = 5000;

const DEFAULT_SCRIPT = `// Write JavaScript or TypeScript, then press Ctrl+Enter
const greet = (name: string): string => \`Hello, \${name}!\`;
console.log(greet("terminal"));
console.table([{ language: "typescript", sandboxed: true }]);
`;

@Component({
	selector: "app-terminal",
	standalone: true,
	templateUrl: "./terminal.component.html",
	styleUrl: "./terminal.component.css",
	imports: [FormsModule, SelectFieldComponent, TextareaFieldComponent],
})
export class TerminalComponent {
	readonly languages: SelectOption[] = [
		{ value: "typescript", label: "TypeScript" },
		{ value: "javascript", label: "JavaScript" },
	];
	readonly terminal = inject(TerminalService);
	readonly language = signal<Language>("typescript");
	readonly script = signal(DEFAULT_SCRIPT);
	readonly output = signal<OutputLine[]>([]);
	readonly running = signal(false);
	private readonly highlightPre =
		viewChild<ElementRef<HTMLElement>>("highlight");
	private cancelRun: (() => void) | undefined;

	// The highlighted copy sits behind the transparent textarea; a trailing newline keeps the last line's height.
	readonly highlighted = computed(
		() =>
			hljs.highlight(this.script() + "\n", { language: this.language() }).value,
	);

	syncScroll(event: Event): void {
		const textarea = event.target as HTMLTextAreaElement;
		const pre = this.highlightPre()?.nativeElement;
		if (pre) {
			pre.scrollTop = textarea.scrollTop;
			pre.scrollLeft = textarea.scrollLeft;
		}
	}

	async run(): Promise<void> {
		if (this.running()) return;
		this.output.set([]);
		this.running.set(true);

		let code = this.script();
		if (this.language() === "typescript") {
			try {
				// Loaded on first TypeScript run only; sucrase just removes the type annotations.
				const { transform } = await import("sucrase");
				code = transform(code, { transforms: ["typescript"] }).code;
			} catch (error) {
				this.append({ level: "error", text: String(error) });
				this.running.set(false);
				return;
			}
		}

		this.cancelRun = runInSandbox(
			code,
			(event) => this.onEvent(event),
			TIMEOUT_MS,
		);
	}

	stop(): void {
		this.cancelRun?.();
		this.cancelRun = undefined;
		this.running.set(false);
	}

	clear(): void {
		this.output.set([]);
	}

	// Document-level so the hotkey works wherever focus is while the terminal is open.
	@HostListener("document:keydown", ["$event"])
	onKeydown(event: KeyboardEvent): void {
		if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
			event.preventDefault();
			this.run();
		}
	}

	private onEvent(event: SandboxEvent): void {
		switch (event.type) {
			case "log":
				this.append({ level: event.level, text: event.text });
				break;
			case "done":
				this.cancelRun = undefined;
				this.running.set(false);
				break;
			case "timeout":
				this.append({
					level: "error",
					text: `Stopped: the script ran longer than ${TIMEOUT_MS / 1000} s.`,
				});
				this.cancelRun = undefined;
				this.running.set(false);
				break;
		}
	}

	private append(line: OutputLine): void {
		this.output.update((lines) => [...lines, line]);
	}
}
