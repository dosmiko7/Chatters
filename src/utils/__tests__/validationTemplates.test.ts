import { afterEach, describe, expect, test } from "vitest";

import {
	cityValidation,
	dateValidation,
	emailValidation,
	fileValidation,
	linkValidation,
	nameValidation,
	nicknameValidation,
	passwordRegisterValidation,
} from "../validationTemplates";

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

	describe("fileValidation", () => {
		const dataTransfer = new DataTransfer();

		afterEach(() => {
			dataTransfer.items.clear();
		});

		test("should return true for valid file", () => {
			const file = new File(["file content"], "example.jpg", { type: "image/jpeg" });
			dataTransfer.items.add(file);
			const fileList = dataTransfer.files;

			expect(fileValidation(fileList, ["jpg"])).toBe(true);
		});

		test("should return error message for invalid file extension", () => {
			const file = new File(["file content"], "example.gif", { type: "image/gif" });
			dataTransfer.items.add(file);
			const fileList = dataTransfer.files;

			expect(fileValidation(fileList, ["jpg"])).toBe("Only jpg are allowed");
		});

		test("should return error message for file size exceeding limit", () => {
			const file = new File(["file content"], "large-file.jpg", { type: "image/jpeg" });
			dataTransfer.items.add(file);
			const fileList = dataTransfer.files;
			Object.defineProperty(file, "size", { value: 2 * 1024 * 1024 });

			expect(fileValidation(fileList, ["jpg"])).toBe("File size should be less than 1 MB");
		});
	});

	describe("linkValidation", () => {
		test("valid URL format", () => {
			const validUrls = ["http://example.com", "https://example.com", "https://sub.domain.com/path"];
			validUrls.forEach((url) => {
				expect(linkValidation.pattern.value.test(url)).toBe(true);
			});
		});

		test("invalid URL format", () => {
			const invalidUrls = ["not-a-url", "ftp://ftp.example", "http://.com"];
			invalidUrls.forEach((url) => {
				expect(linkValidation.pattern.value.test(url)).toBe(false);
			});
		});
	});

	describe("nameValidation", () => {
		test("valid names", () => {
			const validNames = ["John", "Jane", "James"];
			validNames.forEach((name) => {
				expect(nameValidation.pattern.value.test(name)).toBe(true);
			});
		});

		test("invalid names", () => {
			const invalidNames = ["123", "John123", "name with spaces", "!@#", ""];
			invalidNames.forEach((name) => {
				expect(nameValidation.pattern.value.test(name)).toBe(false);
			});
		});
	});

	describe("cityValidation", () => {
		test("valid city names", () => {
			const validCities = ["New York", "Los Angeles", "Berlin", "Ålesund"];
			validCities.forEach((city) => {
				expect(cityValidation.pattern.value.test(city)).toBe(true);
			});
		});

		test("invalid city names", () => {
			const invalidCities = ["123", "City123", "!@#", ""];
			invalidCities.forEach((city) => {
				expect(cityValidation.pattern.value.test(city)).toBe(false);
			});
		});
	});

	describe("nicknameValidation", () => {
		test("valid nicknames", () => {
			const validNicknames = ["John123", "JaneDoe", "user123", "Nick123"];
			validNicknames.forEach((nickname) => {
				expect(nicknameValidation.pattern.value.test(nickname)).toBe(true);
			});
		});

		test("invalid nicknames", () => {
			const invalidNicknames = ["!@#", "Nickname^", "Special!Character"];
			invalidNicknames.forEach((nickname) => {
				expect(nicknameValidation.pattern.value.test(nickname)).toBe(false);
			});
		});
	});

	describe("dateValidation", () => {
		test("valid dates", () => {
			const validDates = new Date().toISOString();
			expect(dateValidation.validate(validDates)).toBe(true);
		});

		test("invalid dates (future date)", () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 1);
			expect(dateValidation.validate(futureDate.toISOString())).toBe("The date should not be newer than today");
		});
	});
});
