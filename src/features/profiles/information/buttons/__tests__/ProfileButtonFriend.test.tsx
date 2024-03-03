import { toast } from "react-hot-toast";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import * as useFriendUpdateHooks from "../../useFriendUpdate";
import ProfileButtonFriend from "../ProfileButtonFriend";

vi.mock("react-hot-toast");

const updateFriendMock = vi.fn();

describe("ProfileButtonFriend", () => {
	test("return null if loggedUserId equals profileId", () => {
		vi.spyOn(useFriendUpdateHooks, "default").mockReturnValueOnce({
			updateFriend: updateFriendMock,
			status: "success",
		});

		const { container } = render(
			<ProfileButtonFriend
				isFriend={true}
				loggedUserId="sameId"
				profileId="sameId"
			/>
		);

		expect(container).toBeEmptyDOMElement();
	});

	test("render Button with 'Remove friend' message if isFriend is true", () => {
		vi.spyOn(useFriendUpdateHooks, "default").mockReturnValueOnce({
			updateFriend: updateFriendMock,
			status: "success",
		});

		render(
			<ProfileButtonFriend
				isFriend={true}
				loggedUserId="testLoggedUserId"
				profileId="testProfileId"
			/>
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByText("Remove friend")).toBeInTheDocument();
	});

	test("render Button with 'Add to friends' message if isFriend is false", () => {
		vi.spyOn(useFriendUpdateHooks, "default").mockReturnValueOnce({
			updateFriend: updateFriendMock,
			status: "success",
		});

		render(
			<ProfileButtonFriend
				isFriend={false}
				loggedUserId="testLoggedUserId"
				profileId="testProfileId"
			/>
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByText("Add to friends")).toBeInTheDocument();
	});

	test("should call updateFriend from useFriendUpdate on 'Add' button click", async () => {
		vi.spyOn(useFriendUpdateHooks, "default").mockReturnValueOnce({
			updateFriend: updateFriendMock,
			status: "success",
		});

		render(
			<ProfileButtonFriend
				isFriend={false}
				loggedUserId="testLoggedUserId"
				profileId="testProfileId"
			/>
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(updateFriendMock).toBeCalled();
	});

	test("should call toast on 'Remove' button click", async () => {
		vi.spyOn(useFriendUpdateHooks, "default").mockReturnValueOnce({
			updateFriend: updateFriendMock,
			status: "success",
		});

		render(
			<ProfileButtonFriend
				isFriend={true}
				loggedUserId="testLoggedUserId"
				profileId="testProfileId"
			/>
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		expect(toast).toBeCalled();
	});

	test("should call toast.error if status is error with message 'The operation failed'", () => {
		vi.spyOn(useFriendUpdateHooks, "default").mockReturnValueOnce({
			updateFriend: updateFriendMock,
			status: "error",
		});

		render(
			<ProfileButtonFriend
				isFriend={true}
				loggedUserId="testLoggedUserId"
				profileId="testProfileId"
			/>
		);

		expect(toast.error).toBeCalled();
	});
});
