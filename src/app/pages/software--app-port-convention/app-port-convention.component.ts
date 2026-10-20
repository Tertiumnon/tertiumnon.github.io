import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	HostListener,
	inject,
	signal,
} from "@angular/core";
import { TextFieldComponent } from "../../components/form/text-field.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import {
	FRAMEWORKS,
	type IFramework,
	type IStack,
	PROJECT_SLOTS,
	ROLES,
	STACKS,
} from "./app-port-convention.data";

@Component({
	selector: "app-app-port-convention",
	imports: [CommonModule, TextFieldComponent, PageHeaderComponent],
	templateUrl: "./app-port-convention.component.html",
	styleUrl: "./app-port-convention.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class AppPortConventionComponent {
	private readonly elementRef = inject(ElementRef);

	readonly slots = PROJECT_SLOTS;
	readonly roles = ROLES;

	readonly query = signal("");
	readonly isOpen = signal(false);
	readonly activeIndex = signal(0);
	readonly selected = signal<IFramework | undefined>(undefined);
	readonly slot = signal(0);

	readonly matches = computed(() => {
		const term = this.query().trim().toLowerCase();
		if (!term) return FRAMEWORKS;
		return FRAMEWORKS.filter(
			(framework) =>
				framework.name.toLowerCase().includes(term) ||
				this.stackOf(framework).label.toLowerCase().includes(term),
		);
	});

	readonly ports = computed(() => {
		const framework = this.selected();
		if (!framework) return undefined;
		const stack = this.stackOf(framework);
		const base = stack.base + this.slot() * 100;
		return {
			stack,
			roles: ROLES.map((role) => ({
				name: role.name,
				port: base + role.offset,
			})),
			defaultPort: framework.defaultPort,
			debugPort: framework.debugPort,
		};
	});

	stackOf(framework: IFramework): IStack {
		const stack = STACKS.find((s) => s.id === framework.stack);
		if (!stack) throw new Error(`Unknown stack: ${framework.stack}`);
		return stack;
	}

	onFocus(): void {
		const selected = this.selected();
		if (selected && this.query() === selected.name) this.query.set("");
		this.isOpen.set(true);
	}

	onQueryChange(value: string): void {
		this.query.set(value);
		this.activeIndex.set(0);
		this.isOpen.set(true);
	}

	onKeydown(event: KeyboardEvent): void {
		const items = this.matches();
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			if (!this.isOpen()) {
				this.isOpen.set(true);
				return;
			}
			const last = items.length - 1;
			const next =
				event.key === "ArrowDown"
					? this.activeIndex() < last
						? this.activeIndex() + 1
						: 0
					: this.activeIndex() > 0
						? this.activeIndex() - 1
						: last;
			this.activeIndex.set(next);
			this.scrollActiveIntoView();
		} else if (
			event.key === "Enter" &&
			this.isOpen() &&
			items[this.activeIndex()]
		) {
			event.preventDefault();
			this.select(items[this.activeIndex()]);
		} else if (event.key === "Escape") {
			this.close();
		}
	}

	select(framework: IFramework): void {
		this.selected.set(framework);
		this.query.set(framework.name);
		this.close();
	}

	activeOptionId(): string | null {
		return this.isOpen() && this.matches().length > 0
			? `framework-option-${this.activeIndex()}`
			: null;
	}

	private scrollActiveIntoView(): void {
		const element = this.elementRef.nativeElement.querySelector(
			`#framework-option-${this.activeIndex()}`,
		) as HTMLElement | null;
		element?.scrollIntoView({ block: "nearest" });
	}

	stepSlot(delta: number): void {
		this.slot.update((slot) => Math.min(9, Math.max(0, slot + delta)));
	}

	onSlotChange(event: Event): void {
		this.slot.set(Number((event.target as HTMLSelectElement).value));
	}

	@HostListener("document:click", ["$event"])
	onDocumentClick(event: MouseEvent): void {
		if (!this.elementRef.nativeElement.contains(event.target)) this.close();
	}

	private close(): void {
		this.isOpen.set(false);
		const selected = this.selected();
		this.query.set(selected ? selected.name : "");
	}
}
