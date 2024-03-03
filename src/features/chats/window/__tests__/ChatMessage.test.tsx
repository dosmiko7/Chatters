import { Timestamp } from "firebase/firestore";
import { screen, render, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMessage from "../ChatMessage";

vi.mock("../ChatAvatar", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatAvatar">
				<span>{JSON.stringify(props.data)}</span>
			</div>
		),
	};
});

vi.mock("../ChatMessageContent", () => {
	return {
		default: (props: any) => (
			<div data-testid="ChatMessageContent">
				<span>{JSON.stringify(props.data)}</span>
			</div>
		),
	};
});

describe("ChatMessage", () => {
	const testData = {
		userId: "testUserId",
		type: "testType",
		fileName: "testFileName",
		avatar: "testAvatar",
		currentUser: "testCurrentUser",
		renderPhoto: true,
		message: "testMessage",
		theme: { name: "testThemeName", fontColor: "testThemeFontColor" },
		createdAt: Timestamp.fromDate(new Date()),
		nickname: "testNickname",
	};

	const testIsLeftMessage = testData.userId !== testData.currentUser;

	const testAvatarData = {
		isDisplayed: testData.renderPhoto,
		avatarSrc: testData.avatar,
		isLeftMessage: testIsLeftMessage,
		userId: testData.userId,
	};

	const testMessageContentData = {
		type: testData.type,
		message: testData.message,
		fileName: testData.fileName,
		theme: testData.theme,
		isLeftMessage: testIsLeftMessage,
	};

	test("render properly", () => {
		render(<ChatMessage {...testData} />);

		const listItem = screen.getByRole("listitem");
		expect(listItem).toBeInTheDocument();
		expect(within(listItem).getByTestId("ChatAvatar")).toBeInTheDocument();
		expect(within(listItem).getByTestId("ChatMessageContent")).toBeInTheDocument();
	});

	test("message should be positioned to the left if userId is not equal currentUser", () => {
		render(<ChatMessage {...testData} />);

		const listItem = screen.getByRole("listitem");
		expect(listItem).toHaveAttribute("style", `justify-content: flex-start;`);
	});

	test("message should be positioned to the right if userId equals currentUser", () => {
		testData.userId = "sameUserId";
		testData.currentUser = "sameUserId";
		render(<ChatMessage {...testData} />);

		const listItem = screen.getByRole("listitem");
		expect(listItem).toHaveAttribute("style", `justify-content: flex-end;`);

		testData.userId = "testUserId";
		testData.currentUser = "testCurrentUser";
	});

	test("should pass props properly", () => {
		render(<ChatMessage {...testData} />);

		const chatAvatar = screen.getByTestId("ChatAvatar");
		expect(within(chatAvatar).getByText(JSON.stringify(testAvatarData))).toBeInTheDocument();

		const chatMessageContent = screen.getByTestId("ChatMessageContent");
		expect(within(chatMessageContent).getByText(JSON.stringify(testMessageContentData))).toBeInTheDocument();
	});
});
