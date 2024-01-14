import { describe, expect, test } from "vitest";
import { generateTheme } from "../themes";

describe("generateTheme", () => {
	test("should generate theme with correct values", () => {
		const themeData = generateTheme("exampleTheme", "#111111", "#222222", "#333333");

		expect(themeData.theme).toBe("exampleTheme");
		expect(themeData.variables["--exampleTheme-chat-left"]).toBe("#111111");
		expect(themeData.variables["--exampleTheme-chat-right"]).toBe("#222222");
		expect(themeData.background).toBe(
			"linear-gradient(45deg, var(--exampleTheme-chat-left) 40%, var(--exampleTheme-chat-right) 100%)"
		);
		expect(themeData.fontColor).toBe("#333333");
	});
});
