import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import WelcomeBanner from "../WelcomeBanner";

describe("WelcomeBanner", () => {
	test("render properly", () => {
		render(<WelcomeBanner />);

		expect(screen.getByRole("img")).toHaveAttribute("src", "/logo.png");
		expect(screen.getByRole("heading", { name: "Chatters" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Connect" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "& Talk" })).toBeInTheDocument();
	});
});
