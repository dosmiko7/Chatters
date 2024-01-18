import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ProfileFormStatus from "../ProfileFormStatus";

vi.mock("react-icons/fa6", async () => {
	const actual: Record<string, unknown> = await vi.importActual("react-icons/fa6");

	return {
		...actual,
		FaCheck: () => <div>FaCheck</div>,
		FaCircleXmark: () => <div>FaFircleXmark</div>,
	};
});

vi.mock("../../../../ui/ThreeDots", () => {
	return {
		default: () => <div>ThreeDots</div>,
	};
});

describe("ProfileFormStatus", () => {
	test("render FaCheck element if status is success", () => {
		render(<ProfileFormStatus status="success" />);

		expect(screen.getByText("FaCheck")).toBeInTheDocument();
	});

	test("render ThreeDots element if status is pending", () => {
		render(<ProfileFormStatus status="pending" />);

		expect(screen.getByText("ThreeDots")).toBeInTheDocument();
	});

	test("render FaCircleXmark element if status is error", () => {
		render(<ProfileFormStatus status="error" />);

		expect(screen.getByText("FaFircleXmark")).toBeInTheDocument();
	});
});
