import { screen, render, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import * as useChatsSearchHooks from "../../../../context/useChatsSearch";

import { ChatsSearchWrapper } from "./wrapper";
import ChatsSearch from "../ChatsSearch";

vi.mock("../../../../ui/SearchBar", () => {
	return {
		default: (props: any) => (
			<div data-testid="SearchBar">
				<input
					type="text"
					onChange={(event) => props.onChangeHandler(event)}
				/>
			</div>
		),
	};
});

describe("ChatsSearch", () => {
	test("render properly", () => {
		render(<ChatsSearch />, { wrapper: ChatsSearchWrapper });

		expect(screen.getByTestId("SearchBar")).toBeInTheDocument();
	});

	test("should call enterSearchValue in child component", async () => {
		const enterSearchValueMock = vi.fn();
		vi.spyOn(useChatsSearchHooks, "default").mockReturnValue({
			searchValue: "searched",
			enterSearchValue: enterSearchValueMock,
		});
		render(<ChatsSearch />, { wrapper: ChatsSearchWrapper });

		const searchBar = screen.getByTestId("SearchBar");
		const input = within(searchBar).getByRole("textbox");
		await userEvent.type(input, "test");
		expect(enterSearchValueMock).toBeCalledWith("test");
	});
});
