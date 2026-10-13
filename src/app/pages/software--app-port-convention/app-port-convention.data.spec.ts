import { describe, it, expect } from "vitest";
import {
	FRAMEWORKS,
	PROJECT_SLOTS,
	ROLES,
	STACKS,
} from "./app-port-convention.data";

const BLOCK_SIZE = 1000;
const SLOT_SIZE = 100;

describe("app port convention data", () => {
	it("every framework belongs to a known stack", () => {
		const stackIds = STACKS.map((stack) => stack.id);
		FRAMEWORKS.forEach((framework) => {
			expect(stackIds).toContain(framework.stack);
		});
	});

	it("recommended ports stay inside the stack block and never hit the debugger port", () => {
		FRAMEWORKS.forEach((framework) => {
			const stack = STACKS.find((s) => s.id === framework.stack);
			PROJECT_SLOTS.forEach((slot) => {
				const base = (stack?.base ?? 0) + slot * SLOT_SIZE;
				const ports = ROLES.map((role) => base + role.offset);
				ports.forEach((port) => {
					expect(port).toBeGreaterThanOrEqual(stack?.base ?? 0);
					expect(port).toBeLessThan((stack?.base ?? 0) + BLOCK_SIZE);
				});
				expect(new Set(ports).size).toBe(ROLES.length);
				expect(ports).not.toContain(framework.debugPort);
			});
		});
	});
});
