import { ChangeEvent, ReactElement, useContext } from "react";
import { screen, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatsSearchProvider, { ChatsSearchContext } from "../ChatsSearchContext";
import { userEvent } from "@testing-library/user-event";

interface ChatsSearchContextProps {
	searchValue: string;
	enterSearchValue: (input: string) => void;
}

const customRender = (
	ui: ReactElement,
	{ providerProps, ...renderOptions }: { providerProps: ChatsSearchContextProps }
) => {
	return render(<ChatsSearchContext.Provider value={providerProps}>{ui}</ChatsSearchContext.Provider>, renderOptions);
};

describe("ChatsSearchContext", () => {
	const enterSearchValueMock = vi.fn();

	test("consumer receives values from provider", async () => {
		customRender(
			<ChatsSearchContext.Consumer>
				{(value) => (
					<div>
						<span>Received: {value?.searchValue}</span>
						<input
							type="text"
							onChange={(event: ChangeEvent<HTMLInputElement>) => value?.enterSearchValue(event.target.value)}
						></input>
					</div>
				)}
			</ChatsSearchContext.Consumer>,
			{
				providerProps: { searchValue: "Test", enterSearchValue: enterSearchValueMock },
			}
		);

		const passedValue = screen.getByText(/^Received/i);
		expect(passedValue.textContent).toBe("Received: Test");

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Test");
		expect(enterSearchValueMock).toBeCalled();
	});

	test("ChatsSearchProvider updates searchValue", async () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ChatsSearchProvider>{children}</ChatsSearchProvider>
		);

		const TestComponent = () => {
			const context = useContext(ChatsSearchContext);

			if (!context) return null;

			const { searchValue, enterSearchValue } = context;
			return (
				<div>
					<input
						type="text"
						onChange={(event: ChangeEvent<HTMLInputElement>) => enterSearchValue(event.target.value)}
					/>
					<span data-testid="value">{searchValue}</span>
				</div>
			);
		};

		render(<TestComponent />, { wrapper });

		const value = screen.getByTestId("value");
		expect(value.textContent).toBe("");

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "Test");

		expect(value.textContent).toBe("Test");
	});
});
