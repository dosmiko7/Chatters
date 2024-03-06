import { screen, render, within, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import * as useChatCustomizationHooks from "../useChatCustomization.tsx";
import * as useModalHooks from "../../../../../../hooks/useModal.ts";
import ChatMoreThemePicker from "../ChatMoreThemePicker.tsx";
import wrapper from "../../../__tests__/wrapper.tsx";

describe("ChatMoreThemePicker", () => {
	const changeCustomizationMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useChatCustomizationHooks, "default").mockReturnValueOnce({
			changeCustomization: changeCustomizationMock,
			status: "idle",
		});
		vi.spyOn(useModalHooks, "default").mockReturnValue({ close: vi.fn(), openName: "test", open: vi.fn() });
	});

	test("render properly", () => {
		render(<ChatMoreThemePicker />, { wrapper });

		const grid = screen.getByLabelText("Available themes");
		const themes = within(grid).getAllByLabelText(/^Choose theme/i);
		themes.forEach((theme) => {
			expect(theme).toBeVisible();
		});
	});

	test("should call changeCustomization on theme click", () => {
		render(<ChatMoreThemePicker />, { wrapper });

		const themes = screen.getAllByLabelText(/^Choose theme/i);
		themes.forEach((theme) => {
			fireEvent.click(theme);
		});
		expect(changeCustomizationMock).toBeCalledTimes(themes.length);
	});
});