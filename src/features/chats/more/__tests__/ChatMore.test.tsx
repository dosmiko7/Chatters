import { screen, render, within, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMore from "../ChatMore";

vi.mock("../ChatMoreInfo", () => {
	return {
		default: (props: any) => <div data-testid="ChatMoreInfo">{JSON.stringify(props.infoData)}</div>,
	};
});

vi.mock("../options/ChatMoreOptions", () => {
	return {
		default: (props: any) => <div data-testid="ChatMoreOptions">{JSON.stringify(props.customizationData)}</div>,
	};
});

describe("ChatMore", () => {
	const handlerCloseMock = vi.fn();

	const testCustomizationData = {
		setEmoji: "testEmoji",
		setTheme: "testTheme",
	};

	const testData = {
		avatar: "testAvatar",
		nickname: "testNickname",
		isActive: true,
		lastSeen: "testLastSeen",
	};

	test("render properly", () => {
		render(
			<ChatMore
				data={testData}
				{...testCustomizationData}
				handlerClose={handlerCloseMock}
			/>
		);

		const container = screen.getByRole("container");
		expect(within(container).getByRole("button")).toBeInTheDocument();
		expect(within(container).getByTestId("ChatMoreInfo")).toBeInTheDocument();
		expect(within(container).getByTestId("ChatMoreOptions")).toBeInTheDocument();
	});

	test("should render Error if data does not exist", () => {
		render(
			<ChatMore
				data={undefined}
				{...testCustomizationData}
				handlerClose={handlerCloseMock}
			/>
		);

		expect(screen.getByText("Something went wrong 😓")).toBeInTheDocument();
	});

	test("on button click should call passed handlerClose", () => {
		render(
			<ChatMore
				data={testData}
				{...testCustomizationData}
				handlerClose={handlerCloseMock}
			/>
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(handlerCloseMock).toBeCalled();
	});

	test("pass props to children properly", () => {
		render(
			<ChatMore
				data={testData}
				{...testCustomizationData}
				handlerClose={handlerCloseMock}
			/>
		);

		expect(screen.getByTestId("ChatMoreInfo").textContent).toBe(JSON.stringify(testData));
		expect(screen.getByTestId("ChatMoreOptions").textContent).toBe(JSON.stringify(testCustomizationData));
	});
});
