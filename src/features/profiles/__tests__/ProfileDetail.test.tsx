import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { IDocumentData } from "../../../services/firestore/userApi";
import * as useProfileHooks from "../useProfile";
import ProfileDetail from "../ProfileDetail";

vi.mock("../ProfileInformation", () => {
	return {
		default: (props: any) => <div>ProfileInformation: {props.profileData.id}</div>,
	};
});

vi.mock("../ProfileFriends", () => {
	return {
		default: (props: any) => <div>ProfileFriends: {props.profileData.id}</div>,
	};
});

describe("ProfileDetail", () => {
	test("render properly", () => {
		vi.spyOn(useProfileHooks, "default").mockReturnValue({
			profileData: { id: "test" } as IDocumentData,
			status: "success",
		});

		render(<ProfileDetail />);

		const profile = screen.getByLabelText("Profile");
		expect(profile).toBeInTheDocument();

		const profileInformation = screen.getByText(/^ProfileInformation/i);
		expect(profileInformation).toBeInTheDocument();

		const profileFriends = screen.getByText(/^ProfileFriends/i);
		expect(profileFriends).toBeInTheDocument();
	});

	test("render ErrorMessage if status is error", () => {
		vi.spyOn(useProfileHooks, "default").mockReturnValue({
			profileData: { id: "test" } as IDocumentData,
			status: "error",
		});

		render(<ProfileDetail />);

		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});

	test("render ErrorMessage if profileData does not exist", () => {
		vi.spyOn(useProfileHooks, "default").mockReturnValue({
			profileData: undefined,
			status: "success",
		});

		render(<ProfileDetail />);

		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});

	test("render Spinner if status is pending", () => {
		vi.spyOn(useProfileHooks, "default").mockReturnValue({
			profileData: { id: "test" } as IDocumentData,
			status: "pending",
		});

		render(<ProfileDetail />);

		expect(screen.getByTestId("spinner")).toBeInTheDocument();
	});

	test("passing props properly", () => {
		vi.spyOn(useProfileHooks, "default").mockReturnValue({
			profileData: { id: "test" } as IDocumentData,
			status: "success",
		});

		render(<ProfileDetail />);

		const profileInformation = screen.getByText(/^ProfileInformation/i);
		expect(profileInformation.textContent).toBe("ProfileInformation: test");

		const profileFriends = screen.getByText(/^ProfileFriends/i);
		expect(profileFriends.textContent).toBe("ProfileFriends: test");
	});
});
