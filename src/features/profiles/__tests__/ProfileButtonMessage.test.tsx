import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import ProfileButtonMessage, { IChatData } from "../ProfileButtonMessage";

const useNavigateMock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

let exampleChatData = {} as IChatData;

describe("ProfileButtonMessage", () => {
	beforeEach(() => {
		exampleChatData = {
			nickname: "testNickname",
			avatar: "testAvatar.jpg",
			isActive: true,
			lastSeen: "testLastSeen",
			friendId: "testFriendId",
			userId: "testUserId",
		};
	});

	test("return null if userId equals friendId", () => {
		exampleChatData.friendId = "sameId";
		exampleChatData.userId = "sameId";

		const { container } = render(
			<ProfileButtonMessage
				isFriend={true}
				chatData={exampleChatData}
			/>
		);

		expect(container).toBeEmptyDOMElement();
	});

	test("return null if isFriend is false", () => {
		const { container } = render(
			<ProfileButtonMessage
				isFriend={false}
				chatData={exampleChatData}
			/>
		);

		expect(container).toBeEmptyDOMElement();
	});

	test("render Button if isFriend is true", () => {
		render(
			<ProfileButtonMessage
				isFriend={true}
				chatData={exampleChatData}
			/>
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	test("navigate properly on button click", async () => {
		render(
			<ProfileButtonMessage
				isFriend={true}
				chatData={exampleChatData}
			/>
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(useNavigateMock).toBeCalledWith(`/chat/testUserIdtestFriendId`, {
			state: exampleChatData,
		});
	});
});
