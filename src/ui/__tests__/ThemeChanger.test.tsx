import { ReactElement } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ThemeChanger from "../ThemeChanger";
import DarkThemeProvider, { DarkThemeContext } from "../../context/DarkThemeContext";

vi.mock("react-icons/fa6", async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual("react-icons/fa6");

	return {
		...actual,
		FaMoon: () => <div data-testid="moon-icon">Moon</div>,
		FaSun: () => <div data-testid="sun-icon">Sun</div>,
	};
});

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

describe("ThemeChanger", () => {
	const toggleDarkTheme = vi.fn();

	test("render properely", () => {
		render(
			<DarkThemeProvider>
				<ThemeChanger />
			</DarkThemeProvider>
		);

		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
	});

	test("call toggleDarkTheme onClick", () => {
		customRender(<DarkThemeContext.Consumer>{() => <ThemeChanger />}</DarkThemeContext.Consumer>, {
			providerProps: { isDarkTheme: true, toggleDarkTheme },
		});

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(toggleDarkTheme).toBeCalled();
	});

	describe("changes icon based on the current theme value", () => {
		test("<FaMoon/> if isDarkTheme is true", () => {
			customRender(<DarkThemeContext.Consumer>{() => <ThemeChanger />}</DarkThemeContext.Consumer>, {
				providerProps: { isDarkTheme: true, toggleDarkTheme },
			});

			const button = screen.getByRole("button");

			expect(within(button).getByTestId("moon-icon")).toBeInTheDocument();
		});

		test("<FaSun/> if isDarkTheme is false", () => {
			customRender(<DarkThemeContext.Consumer>{() => <ThemeChanger />}</DarkThemeContext.Consumer>, {
				providerProps: { isDarkTheme: false, toggleDarkTheme },
			});

			const button = screen.getByRole("button");

			expect(within(button).getByTestId("sun-icon")).toBeInTheDocument();
		});
	});
});
