import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMoreModalTheme from "../ChatMoreModalTheme";

vi.mock("../ChatMoreThemePicker", () => {
	return {
		default: () => <div data-testid="ChatMoreThemePicker"></div>,
	};
});

describe("ChatMoreModalTheme", () => {
	test("render properly", () => {
		render(<ChatMoreModalTheme setTheme="testTheme" />);

		expect(screen.getByRole("button")).toHaveTextContent("Theme");
	});

	test("should open ChatMoreThemePicker on button click", async () => {
		render(<ChatMoreModalTheme setTheme="testTheme" />);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		await waitFor(() => {
			expect(screen.getByRole("heading")).toHaveTextContent("Theme");
			expect(screen.getByTestId("ChatMoreThemePicker"));
		});
	});
});
