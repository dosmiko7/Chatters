import { screen, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";

import AuthFormManager from "../AuthFormManager";

vi.mock("../AuthFormField", () => {
	return {
		default: (props: any) => (
			<input
				{...props.register}
				data-testid="AuthFormField"
				type="text"
			/>
		),
	};
});

type Status = "idle" | "pending" | "error" | "success";
type Name = "Login" | "Register";

describe("AuthFormManager", () => {
	const submitHandlerMock = vi.fn();
	const name: Name = "Login";
	const testData = {
		submitHandler: submitHandlerMock,
		name,
		statuses: ["idle"] as Status[],
	};

	test("render properly", () => {
		render(<AuthFormManager {...testData} />);

		expect(screen.getByRole("heading").textContent).toBe("Login");
		expect(screen.getByRole("button").textContent).toBe("Login");
		expect(screen.getAllByTestId("AuthFormField").length).toBe(2);
	});

	test("button should be disabled if statuses include pending status", () => {
		testData.statuses = ["pending"];
		render(<AuthFormManager {...testData} />);

		expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();

		testData.statuses = ["idle"];
	});

	test("submitHandler passed by props should be called on submit", async () => {
		render(<AuthFormManager {...testData} />);

		const inputs = screen.getAllByTestId("AuthFormField");
		await act(() => fireEvent.input(inputs[0], { target: { value: "test" } }));

		const submitButton = screen.getByRole("button", { name: "Login" });
		await act(async () => fireEvent.click(submitButton));
		expect(submitHandlerMock).toBeCalled();
	});
});
