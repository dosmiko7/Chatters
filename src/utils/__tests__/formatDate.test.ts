import { Timestamp } from "firebase/firestore";
import { describe, expect, test } from "vitest";

import formatDate from "../formatDate";

describe("formatDate", () => {
	test("should format timestamp to a string", () => {
		const sampleTimestamp = Timestamp.fromDate(new Date("2022-01-15T12:30:00"));
		const formattedDate = formatDate(sampleTimestamp);
		const expectedFormattedDate = "January 15, 2022";

		expect(formattedDate).toBe(expectedFormattedDate);
	});
});
