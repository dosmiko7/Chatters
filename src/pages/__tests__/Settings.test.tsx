import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Settings from "../Settings";

vi.mock("../../features/settings/SettingsDetail", () => {
	return {
		default: () => <div>SettingsDetail</div>,
	};
});

describe("Settings", () => {
	test("should return SettingsDetail component", () => {
		render(<Settings />);

		expect(screen.getByText("SettingsDetail")).toBeInTheDocument();
	});
});
