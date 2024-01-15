import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { wrapper as queryWrapper } from "./testingQuery";
import SettingsOptionsDelete from "../SettingsOptionsDelete";

const wrapper = ({ children }: { children: JSX.Element }) => <MemoryRouter>{queryWrapper({ children })}</MemoryRouter>;

describe("SettingsOptionsDelete", () => {
	test("should render card", async () => {
		render(<SettingsOptionsDelete />, { wrapper });

		const card = screen.getByLabelText("Card");
		expect(card).toBeInTheDocument();

		const wrapperElement = screen.getByRole("wrapper");
		expect(wrapperElement).toContainElement(card);
	});
});
