import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardButtons from "../DashboardButtons";
import DashboardOptionsProvider from "../../../context/DashboardOptionsContext";

vi.mock("../form/DashboardFormModal", () => {
	return {
		default: () => <div>DashboardFormModal</div>,
	};
});

vi.mock("../DashboardKeyFilter", () => {
	return {
		default: () => <div>DashboardKeyFilter</div>,
	};
});

vi.mock("../DashboardFilters", () => {
	return {
		default: () => <div>DashboardFilters</div>,
	};
});

const wrapper = ({ children }: { children: JSX.Element }) => {
	return <DashboardOptionsProvider>{children}</DashboardOptionsProvider>;
};

describe("DashboardButtons", () => {
	test("render properly", () => {
		render(<DashboardButtons />, { wrapper });

		expect(screen.getByRole("wrapper")).toBeInTheDocument();
		expect(screen.getByText("DashboardFormModal")).toBeInTheDocument();
		expect(screen.getByText("DashboardKeyFilter")).toBeInTheDocument();
		expect(screen.getByText("DashboardFilters")).toBeInTheDocument();
	});
});
