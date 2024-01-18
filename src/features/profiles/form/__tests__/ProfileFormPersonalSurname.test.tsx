import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import ProfileFormPersonalSurname from "../ProfileFormPersonalSurname";
import Wrapper from "./formWrapper";

describe("ProfileFormPersonalSurname", () => {
	test("render properly", () => {
		render(<ProfileFormPersonalSurname />, { wrapper: Wrapper });

		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	test("render matching error if input does not contain only letters", async () => {
		render(<ProfileFormPersonalSurname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "asd123##");

		await waitFor(() => expect(screen.getByText("Only letters")).toBeInTheDocument());
	});

	test("render matching error if input has less than 2 character", async () => {
		render(<ProfileFormPersonalSurname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "A");

		await waitFor(() => expect(screen.getByText("At least 2 character")).toBeInTheDocument());
	});

	test("render matching error if input has more than 20 character", async () => {
		render(<ProfileFormPersonalSurname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Asdasdasdasdasdasdasdasd");

		await waitFor(() => expect(screen.getByText("No more than 20 characters")).toBeInTheDocument());
	});

	test("does not render error if input is valid", async () => {
		render(<ProfileFormPersonalSurname />, { wrapper: Wrapper });

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Poniatowski");

		await waitFor(() => expect(screen.queryByLabelText("Error message")).not.toBeInTheDocument());
	});
});
