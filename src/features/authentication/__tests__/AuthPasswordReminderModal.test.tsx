import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import AuthPasswordReminderModal from "../AuthPasswordReminderModal";

vi.mock("../AuthPasswordReminder", () => {
	return {
		default: () => <div data-testid="AuthPasswordReminder"></div>,
	};
});

describe("AuthPasswordReminderModal", () => {
	test("render properly", () => {
		render(<AuthPasswordReminderModal />);

		expect(screen.getByText("Forgot Password")).toBeInTheDocument();
	});

	test("should open AuthPasswordReminder on click", async () => {
		render(<AuthPasswordReminderModal />);

		const opener = screen.getByText("Forgot Password");
		fireEvent.click(opener);

		await waitFor(() => expect(screen.getByTestId("AuthPasswordReminder")).toBeVisible());
	});
});
