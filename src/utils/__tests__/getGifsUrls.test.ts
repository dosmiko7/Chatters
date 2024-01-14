import { describe, expect, test } from "vitest";
import getGifsUrls from "../getGifsUrls";

describe("getGifsUrls", () => {
	test("should return an array of GIF URLs from a Giphy result", () => {
		const giphyResult = {
			data: [{ images: { fixed_width: { url: "url1" } } }, { images: { fixed_width: { url: "url2" } } }],
		};

		const result = getGifsUrls(giphyResult);

		expect(result).toEqual(["url1", "url2"]);
	});

	test("should handle an empty Giphy result", () => {
		const giphyResult = { data: [] };

		const result = getGifsUrls(giphyResult);

		expect(result).toEqual([]);
	});

	test("should handle missing properties in the Giphy result", () => {
		const giphyResult = { data: [{}] };

		const result = getGifsUrls(giphyResult);

		expect(result).toEqual([]);
	});
});
