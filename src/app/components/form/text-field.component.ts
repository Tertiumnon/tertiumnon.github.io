import {
	Component,
	forwardRef,
	input,
	model,
	output,
	signal,
} from "@angular/core";
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FIELD_STYLES } from "./field.styles";

// Text, search, date and time input. Works with [(value)], [value] and reactive forms.
@Component({
	selector: "app-text-field",
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFieldComponent),
			multi: true,
		},
	],
	template: `
		<input
			class="field"
			[type]="type()"
			[attr.aria-label]="label() || null"
			[attr.name]="name() || null"
			[attr.autocomplete]="autocomplete()"
			[placeholder]="placeholder()"
			[readOnly]="readOnly()"
			[attr.role]="role() || null"
			[attr.aria-autocomplete]="role() ? 'list' : null"
			[attr.aria-expanded]="expanded()"
			[attr.aria-controls]="controls() || null"
			[attr.aria-activedescendant]="activeDescendant() || null"
			[disabled]="disabled()"
			[value]="value()"
			(input)="onInput($event)"
			(focus)="focused.emit()"
			(keydown)="keydown.emit($event)"
			(blur)="onTouched()" />
	`,
	styles: [FIELD_STYLES],
})
export class TextFieldComponent implements ControlValueAccessor {
	readonly type = input("text");
	readonly label = input("");
	readonly name = input("");
	readonly placeholder = input("");
	readonly readOnly = input(false);
	readonly autocomplete = input("off");
	// ARIA for combobox use, such as the framework picker.
	readonly role = input("");
	readonly expanded = input<boolean | null>(null);
	readonly controls = input("");
	readonly activeDescendant = input<string | null>("");
	readonly value = model("");
	readonly focused = output<void>();
	readonly keydown = output<KeyboardEvent>();
	readonly disabled = signal(false);

	private propagateChange: (value: string) => void = () => {};
	protected onTouched: () => void = () => {};

	onInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
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
