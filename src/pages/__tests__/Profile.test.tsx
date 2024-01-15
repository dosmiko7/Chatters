import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Profile from "../Profile";

vi.mock("../../features/profiles/ProfileDetail", () => {
	return {
		default: () => <div>ProfileDetail</div>,
	};
});

describe("Profile", () => {
	test("should return ProfileDetail component", () => {
		render(<Profile />);

		expect(screen.getByText("ProfileDetail")).toBeInTheDocument();
	});
});
