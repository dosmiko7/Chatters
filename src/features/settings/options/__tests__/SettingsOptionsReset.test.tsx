import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi, Mock } from "vitest";
import { User } from "firebase/auth";
import { toast } from "react-hot-toast";

import { wrapper } from "../../__tests__/testingQuery";
import * as useLoggedUserHooks from "../../../authentication/useLoggedUser";
import SettingsOptionsReset from "../SettingsOptionsReset";

const sendResetEmailMock: Mock = vi.fn();

vi.mock("../../../authentication/usePasswordReset", async (): Promise<unknown> => {
	return {
		default: () => ({ sendResetEmail: sendResetEmailMock }),
	};
});

vi.mock("react-hot-toast");

describe("SettingsOptionsReset", () => {
	test("render properly", () => {
		render(<SettingsOptionsReset />, { wrapper });

		const container = screen.getByRole("container");
		const heading = screen.getByRole("heading");
		const paragraph = screen.getByRole("paragraph");

		expect(container).toContainElement(heading);
		expect(container).toContainElement(paragraph);

		expect(heading.textContent).toBe("Password reset");
		expect(paragraph.textContent).toContain("Click if you");
	});

	test("call usePasswordReset hook onClick", async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: { email: "test@gmail.com" } as User });

		render(<SettingsOptionsReset />, { wrapper });

		const card = screen.getByLabelText("Card");

		await userEvent.click(card);

		expect(sendResetEmailMock).toBeCalled();
	});

	test("should call toast.error if logged user is not defined", async () => {
		vi.spyOn(useLoggedUserHooks, "default").mockReturnValueOnce({ loggedUser: null });

		render(<SettingsOptionsReset />, { wrapper });

		const card = screen.getByLabelText("Card");

		await userEvent.click(card);

		expect(toast.error).toBeCalled();
	});
});
