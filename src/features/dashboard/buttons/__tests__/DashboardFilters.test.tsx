import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import * as useDashboardOptionsHooks from "../../../../context/useDashboardOptions";
import { IOptionsDashboard } from "../../../../services/firestore/dashboardApi";
import DashboardOptionsProvider from "../../../../context/DashboardOptionsContext";
import DashboardFilters from "../DashboardFilters";

vi.mock("react-icons/hi", () => {
	const actual = vi.importActual("react-icons/hi");
	return {
		...actual,
		HiSortAscending: () => <div>HiSortAscending</div>,
		HiSortDescending: () => <div>HiSortDescending</div>,
	};
});

vi.mock("../DashboardFilterButton", () => {
	return {
		default: (props: any) => (
			<button onClick={props.onClickHandler}>
				{props.icon}
				<span>{props.isActive.toString()}</span>
			</button>
		),
	};
});

const wrapper = ({ children }: { children: JSX.Element }) => {
	return <DashboardOptionsProvider>{children}</DashboardOptionsProvider>;
};

describe("DashboardFilters", () => {
	const setOrderMock = vi.fn();
	const setKeyMock = vi.fn();

	test("render properly", () => {
		render(<DashboardFilters />, { wrapper });

		const buttons = screen.getAllByRole("button");
		expect(buttons.length).toBe(2);
		expect(screen.getByText("HiSortAscending")).toBeInTheDocument();
		expect(screen.getByText("HiSortDescending")).toBeInTheDocument();
	});

	test("should call setOrder with asc on button with HiSortAscending icon", async () => {
		vi.spyOn(useDashboardOptionsHooks, "default").mockReturnValue({
			options: {} as IOptionsDashboard,
			setOrder: setOrderMock,
			setKey: setKeyMock,
		});

		render(<DashboardFilters />, { wrapper });

		const buttonAsc = screen.getByRole("button", { name: "HiSortAscending false" });

		await userEvent.click(buttonAsc);

		expect(setOrderMock).toBeCalledWith("asc");
	});

	test("should call setOrder with desc on button with HiSortDescending icon", async () => {
		vi.spyOn(useDashboardOptionsHooks, "default").mockReturnValue({
			options: {} as IOptionsDashboard,
			setOrder: setOrderMock,
			setKey: setKeyMock,
		});

		render(<DashboardFilters />, { wrapper });

		const buttonDesc = screen.getByRole("button", { name: "HiSortDescending true" });

		await userEvent.click(buttonDesc);

		expect(setOrderMock).toBeCalledWith("desc");
	});

	test("updates selectedOption state correctly", async () => {
		vi.spyOn(useDashboardOptionsHooks, "default").mockReturnValue({
			options: {} as IOptionsDashboard,
			setOrder: setOrderMock,
			setKey: setKeyMock,
		});

		render(<DashboardFilters />, { wrapper });

		const buttonDesc = screen.getByRole("button", { name: "HiSortDescending true" });
		const buttonAsc = screen.getByRole("button", { name: "HiSortAscending false" });

		await userEvent.click(buttonDesc);
		await waitFor(() => {
			expect(buttonDesc).toHaveTextContent("true");
			expect(buttonAsc).toHaveTextContent("false");
		});

		await userEvent.click(buttonAsc);
		await waitFor(() => {
			expect(buttonAsc).toHaveTextContent("true");
			expect(buttonDesc).toHaveTextContent("false");
		});
	});
});
