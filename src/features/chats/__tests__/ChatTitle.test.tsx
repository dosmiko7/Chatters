import { screen, render, within, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatTitle from "../ChatTitle";

vi.mock("../more/ChatMoreOpen", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatMoreOpen">
				<button onClick={() => props.handlerOpen()}>Button</button>
			</div>
		),
	};
});

describe("ChatTitle", () => {
	const handlerOpenMock = vi.fn();

	test("render properly", () => {
		render(
			<ChatTitle
				nickname="testNickname"
				handlerOpen={handlerOpenMock}
			/>
		);

		const chatTitle = screen.getByLabelText("Chat title");
		expect(chatTitle).toBeInTheDocument();
		expect(within(chatTitle).getByRole("heading").textContent).toBe("Chat with testNickname");
	});

	test("should handle no nickname properly", () => {
		render(
			<ChatTitle
				nickname=""
				handlerOpen={handlerOpenMock}
			/>
		);

		expect(screen.getByText("Chat with friend"));
	});

	test("should pass props correctly", () => {
		render(
			<ChatTitle
				nickname=""
				handlerOpen={handlerOpenMock}
			/>
		);

		const chatMoreOpen = screen.getByTestId("ChatMoreOpen");
		const button = within(chatMoreOpen).getByRole("button");

		fireEvent.click(button);
		expect(handlerOpenMock).toBeCalled();
	});
});
