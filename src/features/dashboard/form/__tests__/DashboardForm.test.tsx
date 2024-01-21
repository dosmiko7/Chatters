import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardForm from "../DashboardForm";
import * as useCreatePostHooks from "../useCreatePost";

vi.mock("../DashboardFormButtons", () => {
	return {
		default: () => <div>DashboardFormButtons</div>,
	};
});

vi.mock("../DashboardFormMessage", () => {
	return {
		default: () => <div>DashboardFormMessage</div>,
	};
});

describe("DashboardForm", () => {
	const createPostMock = vi.fn();

	test("render properly", () => {
		vi.spyOn(useCreatePostHooks, "default").mockReturnValueOnce({ createPost: createPostMock, status: "idle" });
		render(<DashboardForm />);

		expect(screen.getByText("DashboardFormMessage")).toBeInTheDocument();
		expect(screen.getByText("DashboardFormButtons")).toBeInTheDocument();
	});

	test("should render Spinner if status is pending", () => {
		vi.spyOn(useCreatePostHooks, "default").mockReturnValueOnce({ createPost: createPostMock, status: "pending" });
		render(<DashboardForm />);

		expect(screen.getByTestId("spinner")).toBeInTheDocument();
	});

	test("should call createPost on submit", async () => {
		vi.spyOn(useCreatePostHooks, "default").mockReturnValueOnce({ createPost: createPostMock, status: "idle" });
		render(<DashboardForm />);

		const form = screen.getByLabelText("Dashboard form");
		fireEvent.submit(form);
		await waitFor(() => expect(createPostMock).toBeCalled());
	});
});
