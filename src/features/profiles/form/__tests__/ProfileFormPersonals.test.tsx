import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProfileFormPersonals from "../ProfileFormPersonals";
import Wrapper from "./formWrapper";

describe("ProfileFormPersonals", () => {
	test("render properly", () => {
		render(<ProfileFormPersonals />, { wrapper: Wrapper });

		const heading = screen.getByRole("heading", { name: "Personals" });
		expect(heading).toBeInTheDocument();

		const nicknameSection = screen.getByLabelText(/^Nickname/i);
		expect(nicknameSection).toBeInTheDocument();
		expect(within(nicknameSection).getByRole("textbox")).toBeInTheDocument();

		const nameSection = screen.getByLabelText(/^Name/i);
		expect(nameSection).toBeInTheDocument();
		expect(within(nameSection).getByRole("textbox")).toBeInTheDocument();

		const surnameSection = screen.getByLabelText(/^Surname/i);
		expect(surnameSection).toBeInTheDocument();
		expect(within(surnameSection).getByRole("textbox")).toBeInTheDocument();

		const citySection = screen.getByLabelText(/^City/i);
		expect(citySection).toBeInTheDocument();
		expect(within(citySection).getByRole("textbox")).toBeInTheDocument();

		const birthdaySection = screen.getByLabelText(/^Birthday/i);
		expect(birthdaySection).toBeInTheDocument();
		expect(within(birthdaySection).getByRole("textbox")).toBeInTheDocument();
	});
});
