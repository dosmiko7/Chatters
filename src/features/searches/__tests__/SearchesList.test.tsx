import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import { IDocumentData } from "../../../services/firestore/userApi";
import * as useSearchUsersHooks from "../useSearchUsers";
import * as useModalHooks from "../../../hooks/useModal";
import SearchesList from "../SearchesList";

const TestSearchesElement = ({
	avatar,
	nickname,
	onClickHandler,
}: {
	avatar: string;
	nickname: string;
	onClickHandler: any;
}) => {
	return (
		<div>
			<span>Avatar: {avatar}</span>
			<span>Nickname: {nickname}</span>
			<button onClick={onClickHandler}>OnClickHandler</button>
		</div>
	);
};

vi.mock("../SearchesElement", () => {
	return {
		default: (props: any) => <TestSearchesElement {...props} />,
	};
});

describe("SearchesList", () => {
	const onClickHandlerMock = vi.fn();
	const closeModalMock = vi.fn();

	test("render properly", () => {
		const exampleData = [
			{ id: "testId1", data: { avatar: "testAvatar1", nickname: "testNickname1" } },
			{ id: "testId2", data: { avatar: "testAvatar2", nickname: "testNickname2" } },
		] as IDocumentData[];

		vi.spyOn(useSearchUsersHooks, "default").mockReturnValue({
			data: exampleData as IDocumentData[],
			status: "success",
		});

		render(
			<SearchesList
				query="test"
				onClickHandler={onClickHandlerMock}
			/>
		);

		expect(screen.getByText("Avatar: testAvatar1")).toBeInTheDocument();
		expect(screen.getByText("Nickname: testNickname1")).toBeInTheDocument();

		expect(screen.getByText("Avatar: testAvatar2")).toBeInTheDocument();
		expect(screen.getByText("Nickname: testNickname2")).toBeInTheDocument();
	});

	test("should return ErrorMessage if status is error", () => {
		vi.spyOn(useSearchUsersHooks, "default").mockReturnValue({
			data: [] as IDocumentData[],
			status: "error",
		});

		render(
			<SearchesList
				query="test"
				onClickHandler={onClickHandlerMock}
			/>
		);

		const message = screen.getByText("Sorry. Something went wrong.");
		expect(message).toBeInTheDocument();
	});

	test("should return Spinner if status is pending", () => {
		vi.spyOn(useSearchUsersHooks, "default").mockReturnValue({
			data: [] as IDocumentData[],
			status: "pending",
		});

		render(
			<SearchesList
				query="test"
				onClickHandler={onClickHandlerMock}
			/>
		);

		const spinner = screen.getByTestId("spinner");
		expect(spinner).toBeInTheDocument();
	});

	test("should return Heading if data is empty", () => {
		vi.spyOn(useSearchUsersHooks, "default").mockReturnValue({
			data: [] as IDocumentData[],
			status: "success",
		});

		render(
			<SearchesList
				query="test"
				onClickHandler={onClickHandlerMock}
			/>
		);

		const heading = screen.getByRole("heading");
		expect(heading.textContent).toBe("There is no such user.");
	});

	test("passing onClickHandler properly", async () => {
		const exampleData = [{ id: "testId", data: { avatar: "testAvatar", nickname: "testNickname" } }] as IDocumentData[];

		vi.spyOn(useSearchUsersHooks, "default").mockReturnValue({
			data: exampleData as IDocumentData[],
			status: "success",
		});

		vi.spyOn(useModalHooks, "default").mockReturnValue({ close: closeModalMock, openName: "test", open: vi.fn() });

		render(
			<SearchesList
				query="test"
				onClickHandler={onClickHandlerMock}
			/>
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(onClickHandlerMock).toBeCalled();
		expect(closeModalMock).toBeCalled();
	});
});
