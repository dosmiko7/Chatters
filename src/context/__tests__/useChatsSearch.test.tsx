import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import ChatsSearchProvider from "../ChatsSearchContext";
import useChatsSearch from "../useChatsSearch";

const TestComponent = () => {
	const { searchValue, enterSearchValue } = useChatsSearch();
	return (
		<div>
			<span>Search value: {searchValue}</span>
			<input
				type="text"
				onChange={(event) => enterSearchValue(event.target.value)}
			/>
		</div>
	);
};

describe("useChatsSearch", () => {
	test("hook returns an error if used outside the context provider", () => {
		vi.spyOn(console, "error").mockImplementation(() => undefined);

		expect(() => render(<TestComponent />)).toThrow("ChatsSearchContext was used outside of ChatsSearchProvider");
	});

	test("component receives context value using a hook", async () => {
		render(<TestComponent />, { wrapper: ChatsSearchProvider });

		const searchValue = screen.getByText(/^Search/i);
		expect(searchValue.textContent).toBe("Search value: ");

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "test");
		expect(searchValue.textContent).toBe("Search value: test");
	});
});
