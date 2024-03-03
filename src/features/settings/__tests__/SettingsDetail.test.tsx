import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { wrapper } from "./testingQuery";
import SettingsDetail from "../SettingsDetail";

vi.mock("../options/SettingsOptions", () => {
	return {
		default: () => <ul>Options</ul>,
	};
});

describe("SettingsDetail", () => {
	test("render properly", () => {
		render(<SettingsDetail />, { wrapper });

		const container = screen.getByRole("container");
		const heading = screen.getByRole("heading");
		const list = screen.getByRole("list");

		expect(container).toBeInTheDocument();
		expect(heading.textContent).toBe("Settings");
		expect(container).toContainElement(heading);
		expect(container).toContainElement(list);
	});
});
