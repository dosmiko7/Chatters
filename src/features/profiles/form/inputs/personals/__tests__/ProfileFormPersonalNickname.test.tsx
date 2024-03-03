import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import ProfileFormPersonalNickname from "../ProfileFormPersonalNickname";
import Wrapper from "../../../__tests__/formWrapper";

describe("ProfileFormPersonalNickname", () => {
	test("render properly", () => {
		render(<ProfileFormPersonalNickname />, { wrapper: Wrapper });

		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	test("render matching error if input contains special characters", async () => {
		render(<ProfileFormPersonalNickname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "asd123##");

		await waitFor(() => expect(screen.getByText("Special characters are not allowed")).toBeInTheDocument());
	});

	test("render matching error if input has less than 5 character", async () => {
		render(<ProfileFormPersonalNickname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "A");

		await waitFor(() => expect(screen.getByText("At least 5 characters")).toBeInTheDocument());
	});

	test("render matching error if input has more than 20 character", async () => {
		render(<ProfileFormPersonalNickname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Asdasdasdasdasdasdasdasd");

		await waitFor(() => expect(screen.getByText("No more than 20 characters")).toBeInTheDocument());
	});

	test("does not render error if input is valid", async () => {
		render(<ProfileFormPersonalNickname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Nickname7");

		await waitFor(() => expect(screen.queryByLabelText("Error message")).not.toBeInTheDocument());
	});
});
