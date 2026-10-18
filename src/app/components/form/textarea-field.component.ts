import { Component, forwardRef, input, model, output, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FIELD_STYLES } from "./field.styles";

// Multi-line text. Works with [(value)], [value] and reactive forms.
// overlay: a transparent editor that sits on top of a highlighted copy of the same text.
@Component({
	selector: "app-textarea-field",
	standalone: true,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaFieldComponent), multi: true }],
	template: `
		<textarea
			class="field"
			[class.overlay]="overlay()"
			[attr.aria-label]="label() || null"
			[attr.spellcheck]="spellcheck()"
			[attr.wrap]="wrap()"
			[rows]="rows()"
			[disabled]="disabled()"
			[value]="value()"
			(input)="onInput($event)"
			(keydown)="keydown.emit($event)"
			(scroll)="scrolled.emit($event)"
			(blur)="onTouched()"></textarea>
	`,
	styles: [
		FIELD_STYLES,
		`
		:host {
			display: block;
			height: 100%;
		}

		.field {
			height: 100%;
			min-height: 120px;
			resize: vertical;
		}

		.field.overlay {
			padding: 10px 12px;
			border: none;
			border-radius: 0;
			background: transparent;
			color: transparent;
			box-shadow: none;
			caret-color: var(--theme-text);
			line-height: 1.6;
			tab-size: 2;
			white-space: pre;
			word-wrap: normal;
			resize: none;
			overflow: auto;
		}

		.field.overlay:focus {
			border: none;
			box-shadow: none;
		}
		`,
	],
})
export class TextareaFieldComponent implements ControlValueAccessor {
	readonly label = input("");
	readonly rows = input(6);
	readonly spellcheck = input(true);
	readonly wrap = input<string | null>(null);
	readonly overlay = input(false);
	readonly value = model("");
	readonly keydown = output<KeyboardEvent>();
	readonly scrolled = output<Event>();
	readonly disabled = signal(false);

	private propagateChange: (value: string) => void = () => {};
	protected onTouched: () => void = () => {};

	onInput(event: Event): void {
		const value = (event.target as HTMLTextAreaElement).value;
		this.value.set(value);
		this.propagateChange(value);
	}

	writeValue(value: string | null): void {
		this.value.set(value ?? "");
	}

	registerOnChange(fn: (value: string) => void): void {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
}
