import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SettingsReauthenticate from "../SettingsReauthenticate";

vi.mock("../SettingsReauthenticateDelete", () => {
	return { default: () => <div>SettingsReauthenticateDelete</div> };
});

describe("SettingsReauthenticate", () => {
	test("render properly", () => {
		render(<SettingsReauthenticate />);

		const paragraph = screen.getByRole("paragraph");
		expect(paragraph.textContent).toContain("Deleting your account");

		const div = screen.getByText("SettingsReauthenticateDelete");
		expect(div).toBeInTheDocument();
	});
});
