import { screen, render, within, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import * as useSmallerResolutionHooks from "../../../../hooks/useSmallerResolution";
import ChatsListElement from "../ChatsListElement";

vi.mock("../../../../ui/Avatar", () => {
	return {
		default: (props: any) => <div data-testid="Avatar">{props.src}</div>,
	};
});

describe("ChatsListElement", () => {
	const handlerMock = vi.fn();

	const testData = {
		onClickHandler: handlerMock,
		isActive: true,
		avatar: "testAvatar",
		nickname: "testNickname",
		lastMessage: "testLastMessage",
	};

	test("render properly", () => {
		render(<ChatsListElement {...testData} />);

		const element = screen.getByLabelText("Chat with testNickname");
		expect(within(element).getByTestId("Avatar")).toBeInTheDocument();
		expect(within(element).getByRole("heading", { name: "testNickname" })).toBeInTheDocument();
		expect(within(element).getByText("testLastMessage")).toBeInTheDocument();
	});
	test("should not render heading and massage if screen size is smaller than 680px", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });
		render(<ChatsListElement {...testData} />);

		expect(screen.queryByRole("heading", { name: "testNickname" })).not.toBeInTheDocument();
		expect(screen.queryByText("testLastMessage")).not.toBeInTheDocument();
	});

	test("should call passed function on click", () => {
		render(<ChatsListElement {...testData} />);

		const element = screen.getByLabelText("Chat with testNickname");
		fireEvent.click(element);

		expect(handlerMock).toBeCalled();
	});
});
