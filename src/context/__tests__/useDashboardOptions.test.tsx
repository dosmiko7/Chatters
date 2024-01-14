import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import useDashboardOptions from "../useDashboardOptions";
import DashboardOptionsProvider from "../DashboardOptionsContext";

const TestComponent = () => {
	const { options, setOrder, setKey } = useDashboardOptions();
	return (
		<div>
			<span>Order value: {options.order}</span>
			<span>Key value: {options.key}</span>
			<button onClick={() => setOrder("desc")}>Desc</button>
			<button onClick={() => setOrder("asc")}>Asc</button>
			<input
				type="text"
				onChange={(event) => setKey(event.target.value)}
			/>
		</div>
	);
};

describe("useDashboardOptions", () => {
	test("hook returns an error if used outside the context provider", () => {
		vi.spyOn(console, "error").mockImplementation(() => undefined);

		expect(() => render(<TestComponent />)).toThrow(
			"DashboardOptionsContext was used outside of DashboardOptionsProvider"
		);
	});

	test("component receives context value using a hook", async () => {
		render(<TestComponent />, { wrapper: DashboardOptionsProvider });

		const orderValue = screen.getByText(/^Order/i);
		expect(orderValue.textContent).toBe("Order value: desc");

		const ascButton = screen.getByRole("button", { name: /^Asc/ });
		await userEvent.click(ascButton);
		expect(orderValue.textContent).toBe("Order value: asc");

		const descButton = screen.getByRole("button", { name: /^Desc/ });
		await userEvent.click(descButton);
		expect(orderValue.textContent).toBe("Order value: desc");

		const keyValue = screen.getByText(/^Key/i);
		expect(keyValue.textContent).toBe("Key value: ");

		const keyInput = screen.getByRole("textbox");
		await userEvent.type(keyInput, "test");
		expect(keyValue.textContent).toBe("Key value: test");
	});
});
