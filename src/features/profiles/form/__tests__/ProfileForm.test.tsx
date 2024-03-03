import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ProfileForm from "../ProfileForm";
import * as useProfileFormSubmitHooks from "../useProfileFormSubmit";

vi.mock("../inputs/images/ProfileFormImages", () => {
	return {
		default: () => <div>ProfileFormImages</div>,
	};
});

vi.mock("../inputs/personals/ProfileFormPersonals", () => {
	return {
		default: () => <div>ProfileFormPersonals</div>,
	};
});

vi.mock("../inputs/socials/ProfileFormSocials", () => {
	return {
		default: () => <div>ProfileFormSocials</div>,
	};
});

vi.mock("../inputs/description/ProfileFormDescription", () => {
	return {
		default: () => <div>ProfileFormDescription</div>,
	};
});

vi.mock("../ProfileFormStatus", () => {
	return {
		default: () => <div>ProfileFormStatus</div>,
	};
});

describe("ProfileForm", () => {
	const submitMock = vi.fn();

	test("render properly", () => {
		vi.spyOn(useProfileFormSubmitHooks, "default").mockReturnValueOnce({ submit: submitMock, status: "idle" });
		render(<ProfileForm images={{ avatar: "testAvatar.jpg", background: "testBackground.jpg" }} />);

		const form = screen.getByLabelText("Profile form");
		expect(form).toBeInTheDocument();
		expect(screen.getByText("ProfileFormImages")).toBeInTheDocument();
		expect(screen.getByText("ProfileFormPersonals")).toBeInTheDocument();
		expect(screen.getByText("ProfileFormSocials")).toBeInTheDocument();
		expect(screen.getByText("ProfileFormDescription")).toBeInTheDocument();
		expect(screen.getByText("ProfileFormStatus")).toBeInTheDocument();
	});

	test("should call submit function on submit", async () => {
		vi.spyOn(useProfileFormSubmitHooks, "default").mockReturnValueOnce({ submit: submitMock, status: "idle" });
		render(<ProfileForm images={{ avatar: "testAvatar.jpg", background: "testBackground.jpg" }} />);

		const form = screen.getByLabelText("Profile form");
		fireEvent.submit(form);
		await waitFor(() => expect(submitMock).toBeCalled());
	});
});
