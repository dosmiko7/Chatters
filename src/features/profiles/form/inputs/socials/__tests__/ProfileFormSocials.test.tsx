import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProfileFormSocials from "../ProfileFormSocials";
import Wrapper from "../../../__tests__/formWrapper";

describe("ProfileFormSocials", () => {
	test("render properly", () => {
		render(<ProfileFormSocials />, { wrapper: Wrapper });

		const heading = screen.getByRole("heading", { name: "Socials" });
		expect(heading).toBeInTheDocument();

		const linkedinSection = screen.getByLabelText(/^Linkedin/i);
		expect(linkedinSection).toBeInTheDocument();
		expect(within(linkedinSection).getByRole("textbox")).toBeInTheDocument();

		const githubSection = screen.getByLabelText(/^GitHub/i);
		expect(githubSection).toBeInTheDocument();
		expect(within(githubSection).getByRole("textbox")).toBeInTheDocument();

		const twitterSection = screen.getByLabelText(/^Twitter/i);
		expect(twitterSection).toBeInTheDocument();
		expect(within(twitterSection).getByRole("textbox")).toBeInTheDocument();
	});
});
