import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ProfileFormImages from "../ProfileFormImages";

vi.mock("../ProfileFormAvatar", () => {
	return {
		default: () => <div>ProfileFormAvatar</div>,
	};
});

vi.mock("../ProfileFormBackground", () => {
	return {
		default: () => <div>ProfileFormBackground</div>,
	};
});

describe("ProfileFormImages", () => {
	test("render properly", () => {
		render(<ProfileFormImages images={{ avatar: "testAvatar.jpg", background: "testBackground.jpg" }} />);

		expect(screen.getByText("ProfileFormAvatar")).toBeInTheDocument();
		expect(screen.getByText("ProfileFormBackground")).toBeInTheDocument();
	});
});
