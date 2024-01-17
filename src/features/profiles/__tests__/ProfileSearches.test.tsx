import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Mock, describe, expect, test, vi } from "vitest";

import ProfileSearches from "../ProfileSearches";
import { userEvent } from "@testing-library/user-event";

vi.mock("../../searches/Searches", () => {
	return {
		default: (props: any) => <button onClick={() => props.onClickHandler("test")}>SearchBar</button>,
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

describe("ProfileSearches", () => {
	test("render properly", () => {
		render(<ProfileSearches />, { wrapper });

		expect(screen.getByRole("wrapper")).toBeInTheDocument();
	});

	test("passed navigateToProfile calls navigate with proper route", async () => {
		render(<ProfileSearches />, { wrapper });

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(useNavigateMock).toBeCalledWith("profile/test");
	});
});
