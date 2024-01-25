import { FieldError } from "react-hook-form";
import { screen, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { emailValidation } from "../../../utils/validationTemplates";

import AuthFormField from "../AuthFormField";

describe("AuthFormField", () => {
	const constantData = {
		name: "test",
		type: "text",
		placeholder: "Test...",
		register: vi.fn(),
		validation: emailValidation,
	};

	test("render properly", () => {
		const testData = {
			...constantData,
			errors: undefined,
		};
		render(<AuthFormField {...testData} />);

		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	test("should render ErrorMessage if errors exist", () => {
		const testData = {
			...constantData,
			errors: { message: "errorTest" } as FieldError,
		};
		render(<AuthFormField {...testData} />);

		expect(screen.getByText("errorTest")).toBeInTheDocument();
	});
});
