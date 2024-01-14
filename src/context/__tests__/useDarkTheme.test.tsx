import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import useDarkTheme from "../useDarkTheme";
import DarkThemeProvider from "../DarkThemeContext";

const TestComponent = () => {
	const { isDarkTheme, toggleDarkTheme } = useDarkTheme();
	return (
		<div>
			<span>isDarkTheme value: {isDarkTheme.toString()}</span>
			<button onClick={toggleDarkTheme}>Toggle</button>
		</div>
	);
};

describe("useDarkTheme", () => {
	test("hook returns an error if used outside the context provider", () => {
		vi.spyOn(console, "error").mockImplementation(() => undefined);

		expect(() => render(<TestComponent />)).toThrow("DarkThemeContext was used outside of DarkThemeProvider");
	});

	test("component receives context value using a hook", async () => {
		render(<TestComponent />, { wrapper: DarkThemeProvider });

		const isDarkThemeValue = screen.getByText(/isDarkTheme/i);
		expect(isDarkThemeValue.textContent).toBe("isDarkTheme value: true");

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(isDarkThemeValue.textContent).toBe("isDarkTheme value: false");
	});
});
