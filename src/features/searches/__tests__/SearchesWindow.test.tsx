import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import SearchesWindow from "../SearchesWindow";

const TestSearchBar = ({
	placeholder,
	onChangeHandler,
	onIconClickHandler,
}: {
	placeholder: string;
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onIconClickHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
	return (
		<div data-testid="test-searchbar">
			<input
				type="text"
				onChange={onChangeHandler}
			/>
			<button onClick={() => onIconClickHandler} />
			<span>{placeholder}</span>
		</div>
	);
};

vi.mock("../../../ui/SearchBar", () => {
	return {
		default: (props: any) => <TestSearchBar {...props} />,
	};
});

vi.mock("../SearchesList", () => {
	return {
		default: (props: any) => <div>{props.query}</div>,
	};
});

describe("SearchesWindow", () => {
	const onClickHandlerMock = vi.fn();

	test("render properly", () => {
		render(
			<SearchesWindow
				onClickHandler={onClickHandlerMock}
				heading="Test"
			/>
		);

		const heading = screen.getByRole("heading");
		expect(heading.textContent).toBe("Test");

		const searchBar = screen.getByTestId("test-searchbar");
		expect(searchBar).toBeInTheDocument();

		const wrapper = screen.getByRole("wrapper");
		expect(wrapper).toBeInTheDocument();
	});

	test("should render empty ListContainer if query is empty", () => {
		render(
			<SearchesWindow
				onClickHandler={onClickHandlerMock}
				heading="Test"
			/>
		);

		const wrapper = screen.getByRole("wrapper");
		expect(wrapper).toBeEmptyDOMElement();
	});

	test("passed handlers updates values", async () => {
		render(
			<SearchesWindow
				onClickHandler={onClickHandlerMock}
				heading="Test"
			/>
		);

		// ListContainer is empty on start cause query === ""
		const wrapper = screen.getByRole("wrapper");
		expect(wrapper).toBeEmptyDOMElement();

		// After update query it should render SearchesList
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");
		await userEvent.type(input, "test");
		await userEvent.click(button);

		await waitFor(() => expect(within(wrapper).getByText("test")).toBeInTheDocument());
	});
});
