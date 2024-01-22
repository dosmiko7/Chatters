import { screen, render, waitFor, within, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useChatHooks from "../useChat";
import ChatDetail from "../ChatDetail";

vi.mock("../ChatTitle", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatTitle">
				<span>{props.nickname}</span>
				<button onClick={() => props.handlerOpen()}>Open</button>
			</div>
		),
	};
});

vi.mock("../ChatWindow", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatWindow">
				<span>{props.currentUser}</span>
				<span>{JSON.stringify(props.chat)}</span>
				<span>{props.error.toString()}</span>
				<span>{props.setTheme}</span>
			</div>
		),
	};
});

vi.mock("../form/ChatForm", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatForm">
				<span>{props.setEmoji}</span>
			</div>
		),
	};
});

vi.mock("../more/ChatMore", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatMore">
				<button onClick={() => props.handlerClose()}>Close</button>
				<span>{JSON.stringify(props.data)}</span>
				<span>{props.setTheme}</span>
				<span>{props.setEmoji}</span>
			</div>
		),
	};
});

describe("ChatDetail", () => {
	const testData = {
		nickname: "testNickname",
		avatar: "testAvatar.jpg",
		isActive: true,
		lastSeen: "testLastSeen",
		friendId: "testFriendId",
		userId: "testUserId",
	};

	beforeEach(() => {
		vi.spyOn(useChatHooks, "default").mockReturnValue({
			chat: [] as useChatHooks.IChatElement[],
			emoji: "testEmoji",
			theme: "testTheme",
			error: false,
		});
	});

	test("render properly", () => {
		render(<ChatDetail state={testData} />);

		expect(screen.getByTestId("ChatTitle")).toBeInTheDocument();
		expect(screen.getByTestId("ChatWindow")).toBeInTheDocument();
		expect(screen.getByTestId("ChatForm")).toBeInTheDocument();
		expect(screen.queryByTestId("ChatMore")).not.toBeInTheDocument();
	});

	test("should open/close ChatMore on button click inside ChatTitle", async () => {
		render(<ChatDetail state={testData} />);

		const button = screen.getByRole("button", { name: "Open" });

		fireEvent.click(button);
		await waitFor(() => expect(screen.getByTestId("ChatMore")).toBeInTheDocument());

		fireEvent.click(button);
		await waitFor(() => expect(screen.queryByTestId("ChatMore")).not.toBeInTheDocument());
	});

	test("should close ChatMore on button click inside ChatMore", async () => {
		render(<ChatDetail state={testData} />);

		const button = screen.getByRole("button", { name: "Open" });

		fireEvent.click(button);
		await waitFor(() => expect(screen.getByTestId("ChatMore")).toBeInTheDocument());

		const chatMoreButton = within(screen.getByTestId("ChatMore")).getByRole("button", { name: "Close" });
		fireEvent.click(chatMoreButton);
		waitFor(() => expect(screen.getByTestId("ChatMore")).not.toBeInTheDocument());
	});

	test("should pass props properly", async () => {
		render(<ChatDetail state={testData} />);

		const chatTitle = screen.getByTestId("ChatTitle");
		expect(within(chatTitle).getByText("testNickname"));

		const chatWindow = screen.getByTestId("ChatWindow");
		expect(within(chatWindow).getByText("testUserId"));
		expect(within(chatWindow).getByText("[]"));
		expect(within(chatWindow).getByText("false"));
		expect(within(chatWindow).getByText("testTheme"));

		const chatForm = screen.getByTestId("ChatForm");
		expect(within(chatForm).getByText("testEmoji"));

		const button = screen.getByRole("button", { name: "Open" });
		fireEvent.click(button);

		await waitFor(() => expect(screen.getByTestId("ChatMore")).toBeInTheDocument());
		const chatMore = screen.getByTestId("ChatMore");
		expect(within(chatMore).getByText(""));
		expect(within(chatMore).getByText("testTheme"));
		expect(within(chatMore).getByText("testEmoji"));
	});
});
