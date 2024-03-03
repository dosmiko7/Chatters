import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Mock, describe, expect, test, vi } from "vitest";

import ProfileFriendsGrid from "../ProfileFriendsGrid";

const useNavigateMock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: (): Mock => useNavigateMock,
	};
});

vi.mock("../ProfileFriendElement", () => {
	return {
		default: (props: any) => (
			<div>
				<span data-testid="avatar">{props.avatar}</span>
				<span data-testid="nickname">{props.nickname}</span>
				<button onClick={props.onClickHandler} />
			</div>
		),
	};
});

const wrapper = ({ children }: { children: JSX.Element }) => <MemoryRouter>{children}</MemoryRouter>;

describe("ProfileFriendsGrid", () => {
	const exampleFriendsList = [{ id: "test1", avatar: "testAvatar1", nickname: "testNickname1" }];

	test("render properly", () => {
		render(<ProfileFriendsGrid friendsList={exampleFriendsList} />, { wrapper });

		const avatar = screen.getByTestId("avatar");
		expect(avatar.textContent).toBe("testAvatar1");

		const nickname = screen.getByTestId("nickname");
		expect(nickname.textContent).toBe("testNickname1");
	});

	test("passed navigate function is called properly", async () => {
		render(<ProfileFriendsGrid friendsList={exampleFriendsList} />, { wrapper });

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(useNavigateMock).toBeCalledWith("/profile/test1");
	});
});
