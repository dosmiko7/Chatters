import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ProfileFormModal from "../ProfileFormModal";

vi.mock("../ProfileForm", () => {
	return {
		default: () => <div>ProfileForm</div>,
	};
});

describe("ProfileFormModal", () => {
	const exampleImages = {
		avatar: "testAvatar.jpg",
		background: "testBackground.jpg",
	};

	test("render Button on start", () => {
		render(<ProfileFormModal images={exampleImages} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	test("should open ProfileForm on button click", async () => {
		render(<ProfileFormModal images={exampleImages} />);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		await waitFor(() => expect(screen.getByText("ProfileForm")).toBeInTheDocument());
	});
});
