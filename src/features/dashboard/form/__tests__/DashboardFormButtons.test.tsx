import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardFormButtons from "../DashboardFormButtons";

vi.mock("../DashboardFormFile", () => {
	return {
		default: () => <div>DashboardFormFile</div>,
	};
});

vi.mock("../DashboardFormSubmit", () => {
	return {
		default: () => <div>DashboardFormSubmit</div>,
	};
});

vi.mock("../DashboardFormGIF", () => {
	return {
		default: () => <div>DashboardFormGIF</div>,
	};
});

describe("DashboardFormButtons", () => {
	test("render properly", () => {
		render(<DashboardFormButtons />);
		expect(screen.getByText("DashboardFormFile"));
		expect(screen.getByText("DashboardFormSubmit"));
		expect(screen.getByText("DashboardFormGIF"));
	});
});
