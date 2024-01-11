import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SearchBar from "../SearchBar";
import { userEvent } from "@testing-library/user-event";

describe("SearchBar", () => {
	const onChangeHandlerMock = vi.fn();
	const onIconClickHandlerMock = vi.fn();

	test("render properly without props", () => {
		render(<SearchBar />);

		const searchBar = screen.getByLabelText("search bar");
		expect(searchBar).toBeInTheDocument();

		expect(within(searchBar).getByRole("icon")).toBeInTheDocument();
		expect(within(searchBar).getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Search");
	});

	test("render properly with props", () => {
		render(
			<SearchBar
				placeholder="Test placeholder"
				onChangeHandler={onChangeHandlerMock}
				onIconClickHandler={onIconClickHandlerMock}
			/>
		);

		const searchBar = screen.getByLabelText("search bar");
		expect(searchBar).toBeInTheDocument();

		expect(within(searchBar).getByRole("icon")).toBeInTheDocument();
		expect(within(searchBar).getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Test placeholder");
	});

	test("icon onClick call passed onClick handler", async () => {
		render(<SearchBar onIconClickHandler={onIconClickHandlerMock} />);

		const icon = screen.getByRole("icon");
		await userEvent.click(icon);
		expect(onIconClickHandlerMock).toBeCalled();
	});

	test("input onChange works properly with passed onChange handler", async () => {
		render(<SearchBar onChangeHandler={onChangeHandlerMock} />);

		const textbox = screen.getByRole("textbox");
		await userEvent.type(textbox, "test");
		expect(onChangeHandlerMock).toBeCalled();
	});
});
