import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import { IOptionsDashboard } from "../../../services/firestore/dashboardApi";
import DashboardKeyRemove from "../DashboardKeyRemove";
import * as useDashboardOptionsHooks from "../../../context/useDashboardOptions";

vi.mock("react-icons/bi", () => {
	const actual = vi.importActual("react-icons/bi");
	return {
		...actual,
		BiEraser: () => <div>BiEraser</div>,
	};
});

describe("DashboardKeyRemove", () => {
	const setOrderMock = vi.fn();
	const setKeyMock = vi.fn();

	test("render properly", () => {
		vi.spyOn(useDashboardOptionsHooks, "default").mockReturnValueOnce({
			options: {} as IOptionsDashboard,
			setOrder: setOrderMock,
			setKey: setKeyMock,
		});

		render(<DashboardKeyRemove />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(within(button).getByText("BiEraser")).toBeInTheDocument();
	});

	test("should call setKey on button click", async () => {
		vi.spyOn(useDashboardOptionsHooks, "default").mockReturnValueOnce({
			options: {} as IOptionsDashboard,
			setOrder: setOrderMock,
			setKey: setKeyMock,
		});

		render(<DashboardKeyRemove />);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(setKeyMock).toBeCalled();
	});
});
