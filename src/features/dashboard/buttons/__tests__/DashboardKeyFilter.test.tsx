import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import { IOptionsDashboard } from "../../../../services/firestore/dashboardApi";
import * as useDashboardOptionsHooks from "../../../../context/useDashboardOptions";
import * as useSmallerResolutionHooks from "../../../../hooks/useSmallerResolution";
import DashboardOptionsProvider from "../../../../context/DashboardOptionsContext";
import DashboardKeyFilter from "../DashboardKeyFilter";

vi.mock("../DashboardKeyRemove", () => {
	return {
		default: () => <div>DashboardKeyRemove</div>,
	};
});

vi.mock("../../../searches/SearchesWindow", () => {
	return {
		default: () => <div>SearchesWindow</div>,
	};
});

const wrapper = ({ children }: { children: JSX.Element }) => {
	return <DashboardOptionsProvider>{children}</DashboardOptionsProvider>;
};

describe("DashboardKeyFilter", () => {
	const setOrderMock = vi.fn();
	const setKeyMock = vi.fn();

	vi.spyOn(useDashboardOptionsHooks, "default").mockReturnValue({
		options: {} as IOptionsDashboard,
		setOrder: setOrderMock,
		setKey: setKeyMock,
	});

	test("render button with Search span", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: false });

		render(<DashboardKeyFilter />, { wrapper });

		const button = screen.getByRole("button");
		expect(within(button).getByText("Search")).toBeInTheDocument();
	});

	test("render button without Search span", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });

		render(<DashboardKeyFilter />, { wrapper });

		const button = screen.getByRole("button");
		expect(within(button).queryByText("Search")).not.toBeInTheDocument();
	});

	test("render SearchesWindow on button click", async () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });

		render(<DashboardKeyFilter />, { wrapper });

		const button = screen.getByRole("button");
		await userEvent.click(button);
		await waitFor(() => expect(screen.getByText("SearchesWindow")).toBeInTheDocument());
	});
});
