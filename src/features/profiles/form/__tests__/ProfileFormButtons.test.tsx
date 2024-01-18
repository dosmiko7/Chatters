import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProfileFormButtons from "../ProfileFormButtons";
import Wrapper from "./formWrapper";

describe("ProfileFormButtons", () => {
	test("render properly", () => {
		render(<ProfileFormButtons />, { wrapper: Wrapper });

		expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
	});
});
