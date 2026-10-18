import { Component, forwardRef, input, model, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FIELD_STYLES } from "./field.styles";

export interface SelectOption {
	value: string;
	label: string;
}

// Drop-down choice. Works with [(value)], [value] and reactive forms.
@Component({
	selector: "app-select-field",
	standalone: true,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectFieldComponent), multi: true }],
	template: `
		<select
			class="field"
			[attr.aria-label]="label() || null"
			[disabled]="disabled()"
			(change)="onChange($event)"
			(blur)="onTouched()">
			@for (option of options(); track option.value) {
			<option [value]="option.value" [selected]="option.value === value()">{{ option.label }}</option>
			}
		</select>
	`,
	styles: [FIELD_STYLES],
})
export class SelectFieldComponent implements ControlValueAccessor {
	readonly label = input("");
	readonly options = input.required<SelectOption[]>();
	readonly value = model("");
	readonly disabled = signal(false);

	private propagateChange: (value: string) => void = () => {};
	protected onTouched: () => void = () => {};

	onChange(event: Event): void {
		const value = (event.target as HTMLSelectElement).value;
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
