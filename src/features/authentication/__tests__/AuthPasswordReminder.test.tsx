import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as usePasswordResetHooks from "../usePasswordReset";
import * as useModalHooks from "../../../hooks/useModal";
import AuthPasswordReminder from "../AuthPasswordReminder";

describe("AuthPasswordReminder", () => {
	const sendResetEmailMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(usePasswordResetHooks, "default").mockReturnValue({
			sendResetEmail: sendResetEmailMock,
			status: "idle",
		});
		vi.spyOn(useModalHooks, "default").mockReturnValue({ close: vi.fn(), openName: "test", open: vi.fn() });
	});

	test("render properly", () => {
		render(<AuthPasswordReminder />);

		const form = screen.getByLabelText("Remind password form");
		expect(form).toBeInTheDocument();
		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("placeholder", "Email");
		expect(input).toBeInTheDocument();
		const submitButton = screen.getByRole("button", { name: "Send email" });
		expect(submitButton).toBeInTheDocument();
	});

	test("render ErrorMessage if an error occurred during validation", async () => {
		render(<AuthPasswordReminder />);

		const input = screen.getByRole("textbox");
		fireEvent.input(input, { target: { value: "nonValidEmail" } });
		fireEvent.blur(input);

		await waitFor(() => expect(screen.getByLabelText("Error message")).toBeVisible());
	});

	test("render ThreeDots component and disable button if status is pending", () => {
		vi.spyOn(usePasswordResetHooks, "default").mockReturnValue({
			sendResetEmail: sendResetEmailMock,
			status: "pending",
		});
		render(<AuthPasswordReminder />);

		expect(screen.getByLabelText("Three dots - loading animation")).toBeInTheDocument();
	});

	test("should call sendResetEmail on submit", async () => {
		render(<AuthPasswordReminder />);

		const submitButton = screen.getByRole("button", { name: "Send email" });
		const input = screen.getByRole("textbox");

		expect(submitButton).not.toBeDisabled();
		fireEvent.input(input, { target: { value: "valid@email.com" } });
		await act(() => fireEvent.click(submitButton));
		expect(sendResetEmailMock).toBeCalled();
	});
});
