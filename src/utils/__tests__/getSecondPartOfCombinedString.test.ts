import { describe, expect, test } from "vitest";

import getSecondPartOfCombinedString from "../getSecondPartOfCombinedString";

describe("getSecondPartOfCombinedString", () => {
	test("should extract the second part of a combined string given a known part", () => {
		const combinedString = "abc123def";
		const knownPart = "abc";

		const result = getSecondPartOfCombinedString({ combinedString, knownPart });

		expect(result).toBe("123def");
	});

	test("should handle known part not found in the combined string", () => {
		const combinedString = "abc123def";
		const knownPart = "xyz";

		const result = getSecondPartOfCombinedString({ combinedString, knownPart });

		expect(result).toBe("abc123def");
	});
});
