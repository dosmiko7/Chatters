import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import ProfileFormSocials from "../ProfileFormSocials";
import Wrapper from "./formWrapper";

/*
const ProfileFormSocials = () => {
	const { register, formState } = useFormContext();
	const socialsErrors = formState.errors.socials;

	return (
		<StyledSocials>
			<Heading as="h3">Socials</Heading>
			<FlexColumn>
				<FlexColumn aria-label="Linkedin input section">
					<InputContainer>
						<FaLinkedin style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Linkedin"
							{...register("socials.linkedin", linkValidation)}
						/>
					</InputContainer>
					{socialsErrors && <ErrorMessage>{get(socialsErrors, "linkedin")?.message}</ErrorMessage>}
				</FlexColumn>

				<FlexColumn aria-label="GitHub input section">
					<InputContainer>
						<FaGithub style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Github"
							{...register("socials.github", linkValidation)}
						/>
					</InputContainer>
					{socialsErrors && <ErrorMessage>{get(socialsErrors, "github")?.message}</ErrorMessage>}
				</FlexColumn>

				<FlexColumn aria-label="Twitter input section">
					<InputContainer>
						<FaXTwitter style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Twitter"
							{...register("socials.twitter", linkValidation)}
						/>
					</InputContainer>
				</FlexColumn>
				{socialsErrors && <ErrorMessage>{get(socialsErrors, "twitter")?.message}</ErrorMessage>}
			</FlexColumn>
		</StyledSocials>
	);
};
*/

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

	test("should display matching error while input is invalid", async () => {
		render(<ProfileFormSocials />, { wrapper: Wrapper });

		const linkedinSection = screen.getByLabelText(/^Linkedin/i);
		const input = within(linkedinSection).getByRole("textbox");

		await userEvent.type(input, "invalid");
		await waitFor(() => expect(screen.getByText("Invalid URL format")).toBeInTheDocument());
	});

	test("should not display error if input is valid", async () => {
		render(<ProfileFormSocials />, { wrapper: Wrapper });

		const twitterSection = screen.getByLabelText(/^Twitter/i);
		const input = within(twitterSection).getByRole("textbox");

		await userEvent.type(input, "https://twitter.com");
		await waitFor(() => expect(screen.queryByText("Invalid URL format")).not.toBeInTheDocument());
	});
});
