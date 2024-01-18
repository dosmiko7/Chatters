import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import ProfileFormPersonalBirthday from "../ProfileFormPersonalBirthday";
import Wrapper from "./formWrapper";

describe("ProfileFormPersonalBirthday", () => {
	test("render properly", () => {
		render(<ProfileFormPersonalBirthday />, { wrapper: Wrapper });

		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	test("change type of input to date on focus", async () => {
		render(<ProfileFormPersonalBirthday />, { wrapper: Wrapper });

		const input = screen.getByPlaceholderText("Birthday");
		expect(screen.getByPlaceholderText("Birthday")).toHaveAttribute("type", "text");
		input.focus();
		expect(screen.getByPlaceholderText("Birthday")).toHaveAttribute("type", "date");
	});

	test("render matching error if the date is newer than today", async () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

		render(<ProfileFormPersonalBirthday />, { wrapper: Wrapper });

		const input = screen.getByPlaceholderText("Birthday");
		input.focus();
		await userEvent.clear(input);
		await userEvent.type(input, tomorrowFormatted);

		await waitFor(() => expect(screen.getByLabelText("Error message")).toBeInTheDocument());
	});

	test("should not render error if input is valid", async () => {
		const today = new Date();
		const todayFormatted = today.toISOString().split("T")[0];

		render(<ProfileFormPersonalBirthday />, { wrapper: Wrapper });

		const input = screen.getByPlaceholderText("Birthday");
		input.focus();
		await userEvent.clear(input);
		await userEvent.type(input, todayFormatted);

		await waitFor(() => expect(screen.queryByLabelText("Error message")).not.toBeInTheDocument());
	});
});
