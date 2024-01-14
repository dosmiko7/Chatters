import { describe, expect, test } from "vitest";

import getCombinedId from "../getCombinedId";

describe("getCombinedId", () => {
	test("should combine two IDs in a consistent manner", () => {
		const firstId = "abc123";
		const secondId = "defa1";

		const result = getCombinedId(firstId, secondId);

		expect(result).toMatch("defa1abc123");
	});
});
