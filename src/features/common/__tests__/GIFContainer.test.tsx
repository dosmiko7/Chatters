import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import GIFContainer from "../GIFContainer";
import * as useGifsHooks from "../../../hooks/useGifs";

vi.mock("../GIFList", () => {
	return {
		default: () => <div>GIFList</div>,
	};
});

describe("GIFContainer", () => {
	const getGifsMock = vi.fn();
	const resetMock = vi.fn();

	test("render info 'Such empty' if gifs do not exist", () => {
		vi.spyOn(useGifsHooks, "default").mockReturnValue({ gifs: [], getGifs: getGifsMock, reset: resetMock });
		render(<GIFContainer isSubmit={true} />);

		const GIFKeyInput = screen.getByPlaceholderText("GIF about...");
		expect(GIFKeyInput).toBeInTheDocument();
		expect(screen.getByText("Such empty 😔"));
	});

	test("render GIFList if gifs do exist", () => {
		vi.spyOn(useGifsHooks, "default").mockReturnValue({ gifs: ["1", "2"], getGifs: getGifsMock, reset: resetMock });
		render(<GIFContainer isSubmit={true} />);

		const GIFKeyInput = screen.getByPlaceholderText("GIF about...");
		expect(GIFKeyInput).toBeInTheDocument();
		expect(screen.getByText("GIFList"));
	});

	test("should call getGifs on scroll", () => {
		vi.spyOn(useGifsHooks, "default").mockReturnValue({
			gifs: ["1", "2", "3", "4", "5"],
			getGifs: getGifsMock,
			reset: resetMock,
		});
		render(<GIFContainer isSubmit={true} />);

		act(() => {
			fireEvent.scroll(screen.getByTestId("list-container"), {
				target: { scrollTop: 100, scrollHeight: 200, clientHeight: 100 },
			});
		});

		expect(getGifsMock).toBeCalledTimes(2);
	});

	test("should call getGifs on new key input", () => {
		vi.spyOn(useGifsHooks, "default").mockReturnValue({
			gifs: ["1", "2", "3", "4", "5"],
			getGifs: getGifsMock,
			reset: resetMock,
		});
		render(<GIFContainer isSubmit={true} />);

		const GIFKeyInput = screen.getByPlaceholderText("GIF about...");

		fireEvent.change(GIFKeyInput, { target: { value: "cats" } });
		fireEvent.keyDown(GIFKeyInput, { key: "Enter", code: "Enter" });

		expect(getGifsMock).toBeCalledTimes(2);

		fireEvent.keyDown(GIFKeyInput, { key: "Enter", code: "Enter" });

		// Should not call again if value has not changed
		expect(getGifsMock).toBeCalledTimes(2);
	});
});
