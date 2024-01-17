import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ProfileFriendElement from "../ProfileFriendElement";

vi.mock("../../../ui/Avatar", () => {
	return {
		default: (props: any) => <img src={props.src} />,
	};
});

describe("ProfileFriendElement", () => {
	const onClickHandlerMock = vi.fn();

	test("render properly", () => {
		render(
			<ProfileFriendElement {...{ avatar: "testAvatar.jpg", nickname: "test", onClickHandler: onClickHandlerMock }} />
		);

		const element = screen.getByLabelText("View profile of test");
		expect(element).toBeInTheDocument();

		const avatar = screen.getByRole("img");
		expect(avatar).toHaveAttribute("src", "testAvatar.jpg");

		const nickname = screen.getByRole("heading");
		expect(nickname.textContent).toBe("test");
	});

	test("call passed onClickHandler function on click", async () => {
		render(
			<ProfileFriendElement {...{ avatar: "testAvatar.jpg", nickname: "test", onClickHandler: onClickHandlerMock }} />
		);

		const element = screen.getByLabelText("View profile of test");
		expect(element).toBeInTheDocument();

		await userEvent.click(element);
		expect(onClickHandlerMock).toBeCalled();
	});
});
