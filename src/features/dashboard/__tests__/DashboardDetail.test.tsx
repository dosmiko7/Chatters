import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardDetail from "../DashboardDetail";

vi.mock("../buttons/DashboardButtons");
vi.mock("../list/DashboardList");

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: JSX.Element }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("DashboardDetail", () => {
	test("render properly", () => {
		render(<DashboardDetail />, { wrapper });

		expect(screen.getByRole("container")).toBeInTheDocument();
		expect(screen.getByRole("heading").textContent).toBe("Dashboard");
	});
});
