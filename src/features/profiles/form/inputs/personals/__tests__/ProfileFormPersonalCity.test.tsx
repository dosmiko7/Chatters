import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import ProfileFormPersonalCity from "../ProfileFormPersonalCity";
import Wrapper from "../../../__tests__/formWrapper";

describe("ProfileFormPersonalCity", () => {
	test("render properly", () => {
		render(<ProfileFormPersonalCity />, { wrapper: Wrapper });

		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	test("render matching error if input does not contain only letters", async () => {
		render(<ProfileFormPersonalCity />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "asd123##");

		await waitFor(() => expect(screen.getByText("Only letters")).toBeInTheDocument());
	});

	test("render matching error if input has less than 2 character", async () => {
		render(<ProfileFormPersonalCity />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "A");

		await waitFor(() => expect(screen.getByText("At least 2 character")).toBeInTheDocument());
	});

	test("render matching error if input has more than 100 character", async () => {
		const exampleInput =
			"AĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGAĄBCĆDEĘFGX";
		render(<ProfileFormPersonalCity />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, exampleInput);

		await waitFor(() => expect(screen.getByText("No more than 100 characters")).toBeInTheDocument());
	});

	test("does not render error if input is valid", async () => {
		render(<ProfileFormPersonalCity />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Warsaw");

		await waitFor(() => expect(screen.queryByLabelText("Error message")).not.toBeInTheDocument());
	});
});
