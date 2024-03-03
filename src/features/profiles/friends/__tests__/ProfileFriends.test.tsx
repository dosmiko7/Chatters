import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { IDocumentData } from "../../../../services/firestore/userApi";
import { IFriendData } from "../../../../services/firestore/userApi";
import ProfileFriends from "../ProfileFriends";

vi.mock("../ProfileFriendsGrid", () => {
	return {
		default: () => <div>ProfileFriendsGrid</div>,
	};
});

describe("ProfileFriends", () => {
	test("render ProfileFriendsGrid if friends_list is not empty", () => {
		const testProfileData = {
			id: "test",
			data: { nickname: "Test", friends_list: [{ id: "testId" }] },
		} as IDocumentData;

		render(<ProfileFriends profileData={testProfileData} />);

		expect(screen.getByText("ProfileFriendsGrid")).toBeInTheDocument();
	});

	test("render additional Heading if friends_list is empty", () => {
		const testProfileData = {
			id: "test",
			data: { nickname: "Test", friends_list: [] as IFriendData[] },
		} as IDocumentData;

		render(<ProfileFriends profileData={testProfileData} />);

		expect(screen.getByRole("heading", { name: "Test doesn't have friends." })).toBeInTheDocument();
	});
});
