import { ReactElement, ReactNode, useContext } from "react";
import { screen, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { IOptionsDashboard } from "../../services/firestore/dashboardApi";
import { DashboardOptionsContext } from "../DashboardOptionsContext";
import DashboardOptionsProvider from "../DashboardOptionsContext";
import { userEvent } from "@testing-library/user-event";

interface DashboardOptionsContextProps {
	options: IOptionsDashboard;
	setOrder: (order: "desc" | "asc") => void;
	setKey: (key: string | null) => void;
}

const customRender = (
	ui: ReactElement,
	{ providerProps, ...renderOptions }: { providerProps: DashboardOptionsContextProps }
) => {
	return render(
		<DashboardOptionsContext.Provider value={providerProps}>{ui}</DashboardOptionsContext.Provider>,
		renderOptions
	);
};

describe("DashboardOptionsContext", () => {
	const setOrderMock = vi.fn();
	const setKeyMock = vi.fn();

	const wrapper = ({ children }: { children: ReactNode }) => (
		<DashboardOptionsProvider>{children}</DashboardOptionsProvider>
	);

	const TestComponent = () => {
		const { options, setOrder, setKey } = useContext(DashboardOptionsContext);
		return (
			<div>
				<span>Order: {options.order}</span>
				<span>Key: {options.key}</span>
				<button onClick={() => setOrder("desc")}>Desc</button>
				<button onClick={() => setOrder("asc")}>Asc</button>
				<input
					type="text"
					onChange={(event) => setKey(event.target.value)}
				/>
			</div>
		);
	};

	test("consumer receives values from provider", () => {
		customRender(
			<DashboardOptionsContext.Consumer>
				{(value) => (
					<div>
						<span>Received order: {value.options.order}</span>
						<span>Received key: {value.options.key}</span>
						<button
							data-testid="order"
							onClick={() => value.setOrder}
						></button>
						<button
							data-testid="key"
							onClick={() => value.setKey}
						></button>
					</div>
				)}
			</DashboardOptionsContext.Consumer>,
			{
				providerProps: { options: { order: "desc", key: "test" }, setOrder: setOrderMock, setKey: setKeyMock },
			}
		);

		const orderValue = screen.getByText(/^Received order/i);
		expect(orderValue.textContent).toBe("Received order: desc");

		const keyValue = screen.getByText(/^Received key/i);
		expect(keyValue.textContent).toBe("Received key: test");
	});

	test("provider updates order value", async () => {
		render(<TestComponent />, { wrapper });

		const orderValue = screen.getByText(/^Order/i);
		expect(orderValue.textContent).toBe("Order: desc");

		const orderAscButton = screen.getByRole("button", { name: /^Asc/i });
		await userEvent.click(orderAscButton);
		expect(orderValue.textContent).toBe("Order: asc");

		const orderDescButton = screen.getByRole("button", { name: /^Desc/i });
		await userEvent.click(orderDescButton);
		expect(orderValue.textContent).toBe("Order: desc");
	});

	test("provider updates key value", async () => {
		render(<TestComponent />, { wrapper });

		const keyValue = screen.getByText(/^Key/i);
		expect(keyValue.textContent).toBe("Key: ");

		const keyInput = screen.getByRole("textbox");
		await userEvent.type(keyInput, "test");
		expect(keyValue.textContent).toBe("Key: test");
	});
});
