import { MemoryRouter } from "react-router-dom";
import { User } from "firebase/auth";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Mock, describe, expect, test, vi } from "vitest";

import ProfileUser from "../ProfileUser";
import * as useLoggedUserHooks from "../../authentication/useLoggedUser";

vi.mock("react-icons/bi", async () => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		BiSolidUser: () => <div>BiSolidUser</div>,
	};
});

const useNavigateMock = vi.fn();

vi.mock(`react-router-dom`, async (): Promise<unknown> => {
	const actual: Record<string, unknown> = await vi.importActual(`react-router-dom`);

	return {
		...actual,
		useNavigate: (): Mock => useNavigateMock,
	};
});

const wrapper = ({ children }: { children: JSX.Element }) => <MemoryRouter>{children}</MemoryRouter>;

describe("ProfileUser", () => {
	test("render properly", () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "test" } as User });

		render(<ProfileUser />, { wrapper });

		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByText("BiSolidUser")).toBeInTheDocument();
	});

	test("navigate to profile/{user.uid} on button click", async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { uid: "test" } as User });

		render(<ProfileUser />, { wrapper });

		const button = screen.getByRole("button");
		await userEvent.click(button);

		await waitFor(() => expect(useNavigateMock).toBeCalledWith("profile/test"));
	});
});
