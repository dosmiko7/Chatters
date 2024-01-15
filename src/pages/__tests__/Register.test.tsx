import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Register from "../Register";

vi.mock("../../features/authentication/AuthFormRegister", () => {
	return {
		default: () => <div>AuthFormRegister</div>,
	};
});

describe("Register", () => {
	test("should return AuthFormRegister component", () => {
		render(<Register />);

		expect(screen.getByText("AuthFormRegister")).toBeInTheDocument();
	});
});
