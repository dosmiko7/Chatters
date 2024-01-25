import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as useSendMessageHooks from "../useSendMessage";
import ChatForm from "../ChatForm";

vi.mock("../ChatFormAdditional", () => {
	return {
		default: () => <div data-testid="ChatFormAdditional"></div>,
	};
});

vi.mock("../ChatFormMessage", () => {
	return {
		default: () => <div data-testid="ChatFormMessage"></div>,
	};
});

vi.mock("../ChatFormEmoji", () => {
	return {
		default: () => <div data-testid="ChatFormEmoji"></div>,
	};
});

describe("ChatForm", () => {
	const sendMessageMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useSendMessageHooks, "default").mockReturnValue({ sendMessage: sendMessageMock, status: "idle" });
	});

	test("render properly", () => {
		render(<ChatForm setEmoji="testEmoji" />);

		expect(screen.getByTestId("ChatFormAdditional")).toBeInTheDocument();
		expect(screen.getByTestId("ChatFormMessage")).toBeInTheDocument();
		expect(screen.getByTestId("ChatFormEmoji")).toBeInTheDocument();
	});

	test("should not call sendMessage on submit if inputs are empty", async () => {
		render(<ChatForm setEmoji="testEmoji" />);

		const chatForm = screen.getByLabelText("Chat form");
		fireEvent.submit(chatForm);
		await waitFor(() => expect(sendMessageMock).not.toBeCalled());
	});
});
