import { describe, expect, test } from "vitest";
import formatSubmit, { overwriteProperties, removeEmptyProperties } from "../formatSubmit"; // Replace with the actual file path

describe("overwriteProperties", () => {
	test("should overwrite the values in data with those in input", () => {
		const data = { prop1: "value1", prop2: "value2" };
		const input = { prop2: "newvalue2", prop3: "value3" };

		const result = overwriteProperties(input, data);

		expect(result).toEqual({ prop1: "value1", prop2: "newvalue2" });
	});
});

describe("removeEmptyProperties", () => {
	test("should remove empty properties from the object", () => {
		const input = { prop1: "value1", prop2: null, prop3: "", prop4: { nestedProp: null, nestedProp2: "value" } };

		const result = removeEmptyProperties(input);

		expect(result).toEqual({ prop1: "value1", prop4: { nestedProp2: "value" } });
	});
});

describe("formatSubmit", () => {
	test("should remove empty properties and overwrite properties in the data object with values from the input object", () => {
		const data = { prop1: "value1", prop2: "value2", prop4: { nestedProp: null, nestedProp2: 2 } };
		const input = { prop2: "newvalue2", prop3: "", prop4: { nestedProp2: "2" } };

		const result = formatSubmit(input, data);

		expect(result).toEqual({ prop1: "value1", prop2: "newvalue2", prop4: { nestedProp: null, nestedProp2: "2" } });
	});
});
