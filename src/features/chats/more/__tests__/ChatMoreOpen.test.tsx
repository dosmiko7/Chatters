import { screen, render, within, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMoreOpen from "../ChatMoreOpen";

vi.mock("react-icons/bs", async () => {
	const actual = await vi.importActual("react-icons/bs");
	return {
		...actual,
		BsThreeDots: () => <div data-testid="BsThreeDots"></div>,
	};
});

describe("ChatMoreOpen", () => {
	const handlerOpenMock = vi.fn();

	test("render properly", () => {
		render(<ChatMoreOpen handlerOpen={handlerOpenMock} />);

		const button = screen.getByRole("button");
		expect(within(button).getByTestId("BsThreeDots")).toBeInTheDocument();
	});

	test("should call passed handlerOpen on button click", () => {
		render(<ChatMoreOpen handlerOpen={handlerOpenMock} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(handlerOpenMock).toBeCalled();
	});
});
