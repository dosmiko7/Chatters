import { screen, render, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMoreCustomization from "../ChatMoreCustomization";

vi.mock("../ChatMoreModalEmoji", () => {
	return {
		default: (props: any) => <div data-testid="ChatMoreModalEmoji">{props.setEmoji}</div>,
	};
});

vi.mock("../ChatMoreModalTheme", () => {
	return {
		default: (props: any) => <div data-testid="ChatMoreModalTheme">{props.setTheme}</div>,
	};
});

describe("ChatMoreCustomization", () => {
	const testData = {
		avatar: "testAvatar",
		nickname: "testNickname",
		setEmoji: "testEmoji",
		setTheme: "testTheme",
		isActive: true,
		lastSeen: "testLastSeen",
	};

	test("render properly", () => {
		render(<ChatMoreCustomization data={testData} />);

		expect(screen.getByRole("heading").textContent).toBe("Customization");
		const list = screen.getByRole("list");
		expect(list).toBeInTheDocument();
		const options = within(list).getAllByRole("listitem");
		expect(options.length).toBe(2);
		expect(within(list).getByTestId("ChatMoreModalEmoji")).toBeInTheDocument();
		expect(within(list).getByTestId("ChatMoreModalTheme")).toBeInTheDocument();
	});

	test("pass props to children correctly", () => {
		render(<ChatMoreCustomization data={testData} />);

		expect(screen.getByTestId("ChatMoreModalEmoji").textContent).toBe("testEmoji");
		expect(screen.getByTestId("ChatMoreModalTheme").textContent).toBe("testTheme");
	});
});
