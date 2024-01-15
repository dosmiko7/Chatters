import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Dashboard from "../Dashboard";

vi.mock("../../features/dashboard/DashboardDetail", () => {
	return {
		default: () => <div>DashboardDetail</div>,
	};
});

describe("Dashboard", () => {
	test("should return DashboardDetail component", () => {
		render(<Dashboard />);

		expect(screen.getByText("DashboardDetail")).toBeInTheDocument();
	});
});
