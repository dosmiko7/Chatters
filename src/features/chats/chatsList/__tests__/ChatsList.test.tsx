import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { screen, render, within } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useChatsListHooks from "../useChatsList";
import * as useChatsSearchHooks from "../../../../context/useChatsSearch";
import * as useLoggedUserHooks from "../../../authentication/useLoggedUser";
import * as useSmallerResolutionHooks from "../../../../hooks/useSmallerResolution";

import ChatsList from "../ChatsList";
import { ChatsSearchWrapper, QueryWrapper } from "./wrapper";

const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async () => {
	const actual = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

vi.mock("../ChatsListElement", () => {
	return {
		default: (props: any) => <div data-testid="ChatsListElement">Nickname: {props.nickname}</div>,
	};
});

const CustomWrapper = ({ children }: { children: JSX.Element }) => {
	return (
		<ChatsSearchWrapper>
			<QueryWrapper>{children}</QueryWrapper>
		</ChatsSearchWrapper>
	);
};

describe("ChatsList", () => {
	const testChats = [
		{
			createdAt: Timestamp.fromDate(new Date()),
			userId: "testUserId1",
			lastMessage: "testLastMessage",
			nickname: "testNickname1",
			avatar: "testAvatar",
			isActive: true,
			lastSeen: "testLastSeen",
		},
		{
			createdAt: Timestamp.fromDate(new Date()),
			userId: "testUserId2",
			lastMessage: "testLastMessage",
			nickname: "searchedNickname",
			avatar: "testAvatar",
			isActive: true,
			lastSeen: "testLastSeen",
		},
	];

	beforeEach(() => {
		vi.spyOn(useChatsListHooks, "default").mockReturnValueOnce({ chats: testChats, error: false });
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "testLoggedUserId" } as User });
	});

	test("render properly", () => {
		render(<ChatsList />, { wrapper: CustomWrapper });

		const chatsListBox = screen.getByLabelText("Chats list");
		const chatsList = within(chatsListBox).getByRole("list");
		const listItems = within(chatsList).getAllByTestId("ChatsListElement");
		expect(listItems.length).toBe(2);
	});

	test("should render ErrorMessage if error is true or loggedUser does not exist", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: undefined });
		render(<ChatsList />, { wrapper: CustomWrapper });

		expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
	});

	test("should change style if screen size is smaller than 680px", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });
		render(<ChatsList />, { wrapper: CustomWrapper });

		const chatsList = screen.getByRole("list");
		expect(chatsList).toHaveAttribute("style", "flex-direction: row;");
	});

	test("should filter chats if searchValue has been changed", () => {
		const enterSearchValueMock = vi.fn();
		vi.spyOn(useChatsSearchHooks, "default").mockReturnValue({
			searchValue: "searched",
			enterSearchValue: enterSearchValueMock,
		});
		render(<ChatsList />, { wrapper: CustomWrapper });

		const chatsList = screen.getByRole("list");
		const listItems = within(chatsList).getAllByTestId("ChatsListElement");
		expect(listItems.length).toBe(1);
	});
});
