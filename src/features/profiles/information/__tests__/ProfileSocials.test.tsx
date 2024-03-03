import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ProfileSocials from "../ProfileSocials";

vi.mock("../../../ui/Social", () => {
	return {
		default: (props: any) => <div>{props.href}</div>,
	};
});

describe("ProfileSocials", () => {
	test("should render socials if they were provided by props", () => {
		render(<ProfileSocials socials={{ linkedin: "linkedinTest", github: "githubTest", twitter: "twitterTest" }} />);

		expect(screen.getByText("linkedinTest")).toBeInTheDocument();
		expect(screen.getByText("githubTest")).toBeInTheDocument();
		expect(screen.getByText("twitterTest")).toBeInTheDocument();
	});

	test("should render info if there is no social", () => {
		render(<ProfileSocials socials={{}} />);

		expect(screen.getByText("No social media.")).toBeInTheDocument();
	});
});
