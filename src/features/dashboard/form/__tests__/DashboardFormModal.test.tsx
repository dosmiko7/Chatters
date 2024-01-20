import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import * as useSmallerResolutionHooks from "../../../../hooks/useSmallerResolution";
import DashboardFormModal from "../DashboardFormModal";

vi.mock("../DashboardForm", () => {
	return {
		default: () => <div>DashboardForm</div>,
	};
});

vi.mock("react-icons/bi", () => {
	const actual = vi.importActual("react-icons/bi");
	return {
		...actual,
		BiSolidMessageAdd: () => <div>BiSolidMessageAdd</div>,
	};
});

describe("DashboardFormModal", () => {
	test("render button on start", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });

		render(<DashboardFormModal />);

		expect(screen.getByRole("button", { name: "BiSolidMessageAdd" })).toBeInTheDocument();
	});

	test("button should have 'New post' span if isSmaller is false", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: false });

		render(<DashboardFormModal />);

		const button = screen.getByRole("button");
		expect(within(button).getByText("New post")).toBeInTheDocument();
	});

	test("should open DashboarfForm on button click", async () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: false });

		render(<DashboardFormModal />);

		const button = screen.getByRole("button");
		expect(screen.queryByText("DashboardForm")).not.toBeInTheDocument();
		await userEvent.click(button);
		await waitFor(() => expect(screen.getByText("DashboardForm")).toBeInTheDocument());
	});
});
