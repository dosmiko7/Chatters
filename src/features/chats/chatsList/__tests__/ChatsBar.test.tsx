import { screen, render, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatsBar from "../ChatsBar";

vi.mock("../ChatsSearch", () => {
	return {
		default: () => <div data-testid="ChatsSearch"></div>,
	};
});

vi.mock("../ChatsListContainer", () => {
	return {
		default: () => <div data-testid="ChatsListContainer"></div>,
	};
});

describe("ChatsBar", () => {
	test("render properly", () => {
		render(<ChatsBar />);

		const container = screen.getByRole("container");
		expect(within(container).getByRole("heading")).toHaveTextContent("Chats");
		expect(within(container).getByTestId("ChatsSearch")).toBeInTheDocument();
		expect(within(container).getByTestId("ChatsListContainer")).toBeInTheDocument();
	});
});
