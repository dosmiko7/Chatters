import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Login from "../Login";

vi.mock("../../features/authentication/AuthFormLogin", () => {
	return {
		default: () => <div>AuthFormLogin</div>,
	};
});

describe("Login", () => {
	test("should return AuthFormLogin component", () => {
		render(<Login />);

		expect(screen.getByText("AuthFormLogin")).toBeInTheDocument();
	});
});
