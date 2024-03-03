import { screen, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ChatAvatar from "../ChatAvatar";

const useNavigateMock = vi.fn();
vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: () => useNavigateMock,
	};
});

describe("ChatAvatar", () => {
	const testData = {
		isDisplayed: true,
		isLeftMessage: true,
		avatarSrc: "testAvatar.png",
		userId: "testUserId",
	};

	test("render properly", () => {
		render(<ChatAvatar data={testData} />);

		expect(screen.getByLabelText("Avatar container")).toBeInTheDocument();
		expect(screen.getByRole("img")).toBeInTheDocument();
	});

	test("navigate to matching route on avatar click", async () => {
		render(<ChatAvatar data={testData} />);

		const wrapper = screen.getByRole("wrapper");
		await userEvent.click(wrapper);

		expect(useNavigateMock).toBeCalledWith("/profile/testUserId");
	});

	test("avatar should be positioned to the left if isLeftMessage prop is true", async () => {
		render(<ChatAvatar data={testData} />);

		const wrapper = screen.getByRole("wrapper");

		await waitFor(() => expect(wrapper).toHaveAttribute("style", "display: block; left: -5rem; right: unset;"));
	});

	test("avatar should be positioned to the right if isLeftMessage prop is false", async () => {
		testData.isLeftMessage = false;
		render(<ChatAvatar data={testData} />);

		const wrapper = screen.getByRole("wrapper");

		await waitFor(() => expect(wrapper).toHaveAttribute("style", "display: block; left: unset; right: -5rem;"));

		testData.isLeftMessage = true;
	});

	test("should not display avatar if passed isDisplayed prop is false", () => {
		testData.isDisplayed = false;
		render(<ChatAvatar data={testData} />);

		expect(screen.queryByRole("wrapper")).not.toBeInTheDocument();

		testData.isDisplayed = true;
	});
});
