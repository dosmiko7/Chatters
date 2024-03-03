import { screen, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMoreOptions from "../ChatMoreOptions";

vi.mock("../customization/ChatMoreCustomization", () => {
	return {
		default: (props: any) => <div data-testid="ChatMoreCustomization">{JSON.stringify(props.data)}</div>,
	};
});

vi.mock("../privacy/ChatMorePrivacy", () => {
	return {
		default: () => <div data-testid="ChatMorePrivacy"></div>,
	};
});

describe("ChatMoreOptions", () => {
	const testData = {
		setTheme: "testTheme",
		setEmoji: "testEmoji",
	};

	test("render properly", () => {
		render(<ChatMoreOptions customizationData={testData} />);

		expect(screen.getByTestId("ChatMoreCustomization")).toBeInTheDocument();
		expect(screen.getByTestId("ChatMorePrivacy")).toBeInTheDocument();
	});

	test("pass props to children correctly", () => {
		render(<ChatMoreOptions customizationData={testData} />);

		const chatMoreCustomization = screen.getByTestId("ChatMoreCustomization");
		expect(chatMoreCustomization).toHaveTextContent(JSON.stringify(testData));
	});
});
