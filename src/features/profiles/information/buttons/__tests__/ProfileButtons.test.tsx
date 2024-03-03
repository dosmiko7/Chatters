import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { IDocumentData } from "../../../../../services/firestore/userApi";
import * as useLoggedUserHooks from "../../../../authentication/useLoggedUser";
import ProfileButtons from "../ProfileButtons";

vi.mock("../form/ProfileFormModal", () => {
	return {
		default: () => <div>ProfileFormModal</div>,
	};
});

vi.mock("../ProfileButtonFriend", () => {
	return {
		default: () => <div>ProfileButtonFriend</div>,
	};
});

vi.mock("../ProfileButtonMessage", () => {
	return {
		default: () => <div>ProfileButtonMessage</div>,
	};
});

const useParamsExampleData: { userId: string | undefined } = { userId: "testProfileId" };

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useParams: () => useParamsExampleData,
	};
});

describe("ProfileButtons", () => {
	const testProfileData = {
		id: "TEST_ID",
		data: {
			nickname: "testNickname",
			avatar: "testAvatar.jpg",
			background: "testBackground.jpg",
			lastLoggedIn: Timestamp.fromDate(new Date()),
			lastLoggedOut: Timestamp.fromDate(new Date()),
			friends_list: [{ id: "testFriendId" }],
		},
	} as IDocumentData;

	afterEach(() => {
		useParamsExampleData.userId = "testProfileId";
	});

	test("return properly", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "test" } as User });

		render(<ProfileButtons profileData={testProfileData} />);

		expect(screen.getByText("ProfileButtonFriend")).toBeInTheDocument();
		expect(screen.getByText("ProfileButtonMessage")).toBeInTheDocument();
	});

	test("return null if loggedUser uid does not exist", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: {} as User });

		const { container } = render(<ProfileButtons profileData={testProfileData} />);
		expect(container).toBeEmptyDOMElement();
	});

	test("return null if profileId does not exist", () => {
		useParamsExampleData.userId = undefined;
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "test" } as User });

		const { container } = render(<ProfileButtons profileData={testProfileData} />);
		expect(container).toBeEmptyDOMElement();
	});

	test("render also ProfileFormModal if loggedUser.uid equals profileId", () => {
		useParamsExampleData.userId = "sameId";
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "sameId" } as User });

		render(<ProfileButtons profileData={testProfileData} />);

		expect(screen.getByText("ProfileFormModal")).toBeInTheDocument();
	});
});
