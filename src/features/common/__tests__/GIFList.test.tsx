import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import GIFList from "../GIFList";
import Wrapper from "./customWrapper";

const setValueMock = vi.fn();
vi.mock("react-hook-form", async () => {
	const actual = await vi.importActual("react-hook-form");
	return {
		...actual,
		useFormContext: () => ({
			register: vi.fn(),
			setValue: setValueMock,
		}),
	};
});

describe("GIFList", () => {
	test("render properly", () => {
		render(
			<GIFList
				gifs={["testGIF1Url", "testGIF2Url"]}
				isSubmit={true}
			/>,
			{ wrapper: Wrapper }
		);

		const list = screen.getByRole("list");
		const listElements = within(list).getAllByRole("listitem");
		expect(listElements).toHaveLength(2);
	});

	test("should not render hidden input if isSubmit is false", () => {
		render(
			<GIFList
				gifs={["1", "2"]}
				isSubmit={false}
			/>,
			{ wrapper: Wrapper }
		);

		expect(screen.queryByPlaceholderText("GIF input")).not.toBeInTheDocument();
	});

	test("should call setValue on GIF element click", async () => {
		render(
			<GIFList
				gifs={["testGIF1Url"]}
				isSubmit={false}
			/>,
			{ wrapper: Wrapper }
		);

		const gifElement = screen.getByLabelText("GIF element");
		await userEvent.click(gifElement);
		expect(setValueMock).toBeCalledWith("gif", "testGIF1Url");
	});
});
