import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import DashboardFormSubmit from "../DashboardFormSubmit";

describe("DashboardFormSubmit", () => {
	test("render properly", () => {
		render(<DashboardFormSubmit />);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});
});
