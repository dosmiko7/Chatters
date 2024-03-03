import { screen, render, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMorePrivacy from "../ChatMorePrivacy";

vi.mock("../ChatMoreDelete", () => {
	return {
		default: () => <div data-testid="ChatMoreDelete"></div>,
	};
});

describe("ChatMorePrivacy", () => {
	test("render properly", () => {
		render(<ChatMorePrivacy />);

		expect(screen.getByRole("heading")).toHaveTextContent("Privacy");
		const list = screen.getByRole("list");
		expect(within(list).getAllByRole("listitem").length).toBe(1);
		expect(screen.getByTestId("ChatMoreDelete")).toBeInTheDocument();
	});
});
