import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import DashboardFormMessage from "../DashboardFormMessage";
import Wrapper from "./formWrapper";

vi.mock("../DashboardFormAttachment", () => {
	return {
		default: () => <div>DashboardFormAttarchment</div>,
	};
});

describe("DashboardFormMessage", () => {
	test("render properly", () => {
		render(<DashboardFormMessage />, { wrapper: Wrapper });

		expect(screen.getByRole("textbox")).toBeInTheDocument();
		expect(screen.getByLabelText("Characters counter")).toBeInTheDocument();
		expect(screen.getByText("DashboardFormAttarchment")).toBeInTheDocument();
	});

	test("placeholder should change if the user has not entered any message", async () => {
		render(<DashboardFormMessage />, { wrapper: Wrapper });

		const textbox = screen.getByRole("textbox");
		await userEvent.click(textbox);
		await userEvent.click(screen.getByText("DashboardFormAttarchment"));

		expect(textbox).toHaveAttribute("placeholder", "Enter some message");
		const placeholderColor = window.getComputedStyle(textbox, null).getPropertyValue("color");
		expect(placeholderColor).not.toBe("inherit");
	});

	test("counter should show 200/200 at most", async () => {
		const user = userEvent.setup({ delay: null });
		const tooLongMessage =
			"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.";

		render(<DashboardFormMessage />, { wrapper: Wrapper });

		const textbox = screen.getByRole("textbox");
		const counter = screen.getByLabelText("Characters counter");
		await user.type(textbox, tooLongMessage);

		expect(counter.textContent).toBe("200 / 200");
	});

	test("placeholder should have the correct value if there is no error", async () => {
		render(<DashboardFormMessage />, { wrapper: Wrapper });

		const textbox = screen.getByRole("textbox");

		expect(textbox).toHaveAttribute("placeholder", "Post message...");
		await userEvent.type(textbox, "Test message.");
		expect(textbox).toHaveAttribute("placeholder", "Post message...");
	});

	test("counter should display correct info", async () => {
		render(<DashboardFormMessage />, { wrapper: Wrapper });

		const textbox = screen.getByRole("textbox");
		const counter = screen.getByLabelText("Characters counter");
		await userEvent.type(textbox, "Test message.");

		expect(counter.textContent).toBe("13 / 200");
	});
});
