import { describe, expect, test } from "vitest";

import isFileExtensionValid from "../isFileExtensionValid";

describe("isFileExtensionValid", () => {
	test("should return true for a valid file extension", () => {
		const fileName = "example.txt";
		const allowedExtensions = ["txt", "pdf", "jpg"];

		const result = isFileExtensionValid(fileName, allowedExtensions);

		expect(result).toBe(true);
	});

	test("should return false for an invalid file extension", () => {
		const fileName = "example.png";
		const allowedExtensions = ["txt", "pdf", "jpg"];

		const result = isFileExtensionValid(fileName, allowedExtensions);

		expect(result).toBe(false);
	});

	test("should handle file names with multiple dots correctly", () => {
		const fileName = "example.file.txt";
		const allowedExtensions = ["txt", "pdf", "jpg"];

		const result = isFileExtensionValid(fileName, allowedExtensions);

		expect(result).toBe(true);
	});
});
