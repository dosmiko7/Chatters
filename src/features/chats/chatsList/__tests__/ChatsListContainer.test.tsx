import { screen, render, within, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import * as useSmallerResolutionHooks from "../../../../hooks/useSmallerResolution";
import ChatsListContainer from "../ChatsListContainer";

vi.mock("react-icons/bi", async () => {
	const actual = await vi.importActual("react-icons/bi");
	return {
		...actual,
		BiChevronDown: () => <div>BiChevronDown</div>,
		BiChevronUp: () => <div>BiChevronUp</div>,
	};
});

vi.mock("../ChatsList", () => {
	return {
		default: () => <div data-testid="ChatsList"></div>,
	};
});

describe("ChatsListContainer", () => {
	test("render properly", () => {
		render(<ChatsListContainer />);

		expect(screen.getByRole("heading", { name: "Chats" })).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(within(screen.getByRole("button")).getByText("BiChevronDown")).toBeInTheDocument();
		expect(screen.getByTestId("ChatsList")).toBeInTheDocument();
	});

	test("should close ChatsList and change icon on button click", async () => {
		render(<ChatsListContainer />);

		const button = screen.getByRole("button");

		expect(screen.getByTestId("ChatsList")).toBeInTheDocument();
		expect(within(screen.getByRole("button")).getByText("BiChevronDown")).toBeInTheDocument();

		fireEvent.click(button);
		await waitFor(() => expect(screen.queryByTestId("ChatsList")).not.toBeInTheDocument());
		await waitFor(() => expect(within(screen.getByRole("button")).getByText("BiChevronUp")).toBeInTheDocument());
	});

	test("should not render heading and button if screen size is smaller than 680px", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });
		render(<ChatsListContainer />);

		expect(screen.queryByRole("heading", { name: "Chats" })).not.toBeInTheDocument();
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});
});
