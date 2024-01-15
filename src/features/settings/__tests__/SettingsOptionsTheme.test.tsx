import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import SettingsOptionsTheme from "../SettingsOptionsTheme";
import DarkThemeProvider from "../../../context/DarkThemeContext";

const toggleDarkThemeMock = vi.fn();

vi.mock("../../../context/useDarkTheme", () => {
	return {
		default: () => ({ toggleDarkTheme: toggleDarkThemeMock }),
	};
});

describe("SettingsOptionsTheme", () => {
	test("render properly", () => {
		render(
			<DarkThemeProvider>
				<SettingsOptionsTheme />
			</DarkThemeProvider>
		);

		const card = screen.getByLabelText("Card");
		expect(card).toBeInTheDocument();

		const heading = screen.getByRole("heading");
		const paragraph = screen.getByRole("paragraph");

		expect(card).toContainElement(heading);
		expect(card).toContainElement(paragraph);

		expect(heading.textContent).toBe("Change theme");
		expect(paragraph.textContent).toContain("Match the colors");
	});

	test("call toggleDarkTheme from useDarkTheme on click", async () => {
		render(
			<DarkThemeProvider>
				<SettingsOptionsTheme />
			</DarkThemeProvider>
		);

		const card = screen.getByLabelText("Card");
		await userEvent.click(card);
		expect(toggleDarkThemeMock).toBeCalled();
	});
});
