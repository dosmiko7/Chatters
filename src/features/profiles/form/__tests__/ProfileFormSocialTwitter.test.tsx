import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import Wrapper from "./formWrapper";
import ProfileFormSocialTwitter from "../ProfileFormSocialTwitter";

describe("ProfileFormSocialTwitter", () => {
	test("should display matching error while input is invalid", async () => {
		render(<ProfileFormSocialTwitter />, { wrapper: Wrapper });

		const twitterSection = screen.getByLabelText(/^Twitter/i);
		const input = within(twitterSection).getByRole("textbox");

		await userEvent.type(input, "invalid");
		await waitFor(() => expect(screen.getByText("Invalid URL format")).toBeInTheDocument());
	});

	test("should not display error if input is valid", async () => {
		render(<ProfileFormSocialTwitter />, { wrapper: Wrapper });

		const twitterSection = screen.getByLabelText(/^Twitter/i);
		const input = within(twitterSection).getByRole("textbox");

		await userEvent.type(input, "https://github.com");
		await waitFor(() => expect(screen.queryByText("Invalid URL format")).not.toBeInTheDocument());
	});
});
