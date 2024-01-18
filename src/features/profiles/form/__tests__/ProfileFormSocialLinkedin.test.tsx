import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import Wrapper from "./formWrapper";
import ProfileFormSocialLinkedin from "../ProfileFormSocialLinkedin";

describe("ProfileFormSocialLinkedin", () => {
	test("should display matching error while input is invalid", async () => {
		render(<ProfileFormSocialLinkedin />, { wrapper: Wrapper });

		const linkedinSection = screen.getByLabelText(/^Linkedin/i);
		const input = within(linkedinSection).getByRole("textbox");

		await userEvent.type(input, "invalid");
		await waitFor(() => expect(screen.getByText("Invalid URL format")).toBeInTheDocument());
	});

	test("should not display error if input is valid", async () => {
		render(<ProfileFormSocialLinkedin />, { wrapper: Wrapper });

		const linkedinSection = screen.getByLabelText(/^Linkedin/i);
		const input = within(linkedinSection).getByRole("textbox");

		await userEvent.type(input, "https://github.com");
		await waitFor(() => expect(screen.queryByText("Invalid URL format")).not.toBeInTheDocument());
	});
});
