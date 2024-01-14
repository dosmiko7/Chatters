import { describe, expect, test } from "vitest";

import { emailValidation, passwordRegisterValidation } from "../validationTemplates";

describe("validationTemplates", () => {
	describe("emailValidation", () => {
		test("should validate email pattern", () => {
			expect(emailValidation.pattern.value.test("test@example.com")).toBe(true);
			expect(emailValidation.pattern.value.test("invalid-email")).toBe(false);
		});
	});

	describe("passwordRegisterValidation", () => {
		test("should validate password pattern", () => {
			expect(passwordRegisterValidation.pattern.value.test("Password123!")).toBe(true);
			expect(passwordRegisterValidation.pattern.value.test("password")).toBe(false);
			expect(passwordRegisterValidation.pattern.value.test("Password")).toBe(false);
			expect(passwordRegisterValidation.pattern.value.test("Password123")).toBe(false);
			expect(passwordRegisterValidation.pattern.value.test("Password!")).toBe(true);
		});
	});
});
