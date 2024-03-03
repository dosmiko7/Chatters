import { Timestamp } from "firebase/firestore";
import { screen, render, within } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { toast } from "react-hot-toast";

import ChatWindow from "../ChatWindow";

vi.mock("../../../../data/themes", async () => {
	const actual = await vi.importActual("../../../../data/themes");
	return {
		...actual,
		themes: [
			{ theme: "1", fontColor: "color1" },
			{ theme: "testTheme", fontColor: "testFontColor" },
			{ theme: "2", fontColor: "color2" },
		],
	};
});

vi.mock("../ChatMessage", () => {
	return {
		default: () => <div data-testid="ChatMessage"></div>,
	};
});

vi.mock("react-hot-toast");

describe("ChatWindow", () => {
	const scrollIntoViewMock = vi.fn();
	beforeEach(() => {
		window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
	});

	const testChat = [
		{
			type: "testType",
			fileName: "testFileName",
			message: "testMessage",
			userId: "testUserId",
			createdAt: Timestamp.fromDate(new Date()),
			nickname: "testNickname",
			avatar: "testAvatar",
		},
	];

	test("render properly", () => {
		render(
			<ChatWindow
				currentUser="testCurrentUser"
				chat={testChat}
				setTheme="testTheme"
				error={false}
			/>
		);

		const chatWindow = screen.getByLabelText("Chat window");
		expect(chatWindow).toBeInTheDocument();
		const list = within(chatWindow).getByRole("list");
		expect(list).toBeInTheDocument();
		const chatMessages = within(list).getAllByTestId("ChatMessage");
		expect(chatMessages.length).toBe(1);
	});

	test("should call toast.error if error occured", () => {
		render(
			<ChatWindow
				currentUser="testCurrentUser"
				chat={testChat}
				setTheme="testTheme"
				error={true}
			/>
		);

		expect(toast.error).toBeCalledWith("Something went wrong with fetching messages.");
	});

	test("should scroll into bottom on component render", () => {
		render(
			<ChatWindow
				currentUser="testCurrentUser"
				chat={testChat}
				setTheme="testTheme"
				error={true}
			/>
		);

		expect(scrollIntoViewMock).toBeCalled();
	});
});
