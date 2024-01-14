import { ReactElement, useContext } from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DarkThemeProvider, { DarkThemeContext } from "../DarkThemeContext";

interface DarkThemeContextProps {
	isDarkTheme: boolean;
	toggleDarkTheme: () => void;
}

const customRender = (
	ui: ReactElement,
	{ providerProps, ...renderOptions }: { providerProps: DarkThemeContextProps }
) => {
	return render(<DarkThemeContext.Provider value={providerProps}>{ui}</DarkThemeContext.Provider>, renderOptions);
};

describe("DarkThemeContext", () => {
	const toggleDarkThemeMock = vi.fn();

	const wrapper = ({ children }: { children: React.ReactNode }) => <DarkThemeProvider>{children}</DarkThemeProvider>;

	const TestComponent = () => {
		const context = useContext(DarkThemeContext);

		if (!context) return null;

		const { isDarkTheme, toggleDarkTheme } = context;
		return (
			<div>
				<button onClick={toggleDarkTheme}>Click</button>
				<span>Current value isDarkTheme: {isDarkTheme.toString()}</span>
			</div>
		);
	};

	test("consumer receives values from provider", () => {
		customRender(
			<DarkThemeContext.Consumer>
				{(value) => (
					<div>
						<span>Received: {value?.isDarkTheme.toString()}</span>
						<button onClick={value?.toggleDarkTheme}></button>
					</div>
				)}
			</DarkThemeContext.Consumer>,
			{
				providerProps: { isDarkTheme: true, toggleDarkTheme: toggleDarkThemeMock },
			}
		);

		const value = screen.getByText(/^Received/i);
		expect(value.textContent).toBe("Received: true");

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(toggleDarkThemeMock).toBeCalled();
	});

	test("provider updates isDarkTheme value", () => {
		render(<TestComponent />, { wrapper });

		const currentValue = screen.getByText(/^Current/i);
		expect(currentValue.textContent).toBe("Current value isDarkTheme: true");

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(currentValue.textContent).toBe("Current value isDarkTheme: false");

		fireEvent.click(button);
		expect(currentValue.textContent).toBe("Current value isDarkTheme: true");
	});

	test("context updates document class list", () => {
		render(<TestComponent />, { wrapper });

		expect(document.documentElement.classList).toContain("dark-theme");

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(document.documentElement.classList).toContain("light-theme");

		fireEvent.click(button);
		expect(document.documentElement.classList).toContain("dark-theme");
	});
});
