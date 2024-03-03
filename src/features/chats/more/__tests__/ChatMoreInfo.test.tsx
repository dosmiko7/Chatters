import { screen, render, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMoreInfo from "../ChatMoreInfo";
import * as useSmallerResolutionHooks from "../../../../hooks/useSmallerResolution";

vi.mock("../../../../ui/Avatar", () => {
	return {
		default: (props: any) => <div data-testid="Avatar">{props.size}</div>,
	};
});

describe("ChatMoreInfo", () => {
	const testData = {
		avatar: "testAvatar",
		nickname: "testNickname",
		isActive: true,
		lastSeen: "testLastSeen",
	};

	test("render properly", () => {
		render(<ChatMoreInfo infoData={testData} />);

		const infoContainer = screen.getByLabelText("Info about the user");
		expect(infoContainer).toBeInTheDocument();
		expect(within(infoContainer).getByTestId("Avatar")).toBeInTheDocument();
		expect(within(infoContainer).getByLabelText("Nickname of user")).toBeInTheDocument();
		expect(within(infoContainer).getByLabelText("Active status of user")).toBeInTheDocument();
	});

	test("should change size of Avatar if screen size is smaller than 860px", () => {
		vi.spyOn(useSmallerResolutionHooks, "default").mockReturnValueOnce({ isSmaller: true });
		render(<ChatMoreInfo infoData={testData} />);

		expect(screen.getByTestId("Avatar")).toHaveTextContent("12rem");
	});

	describe("should change activeStatus based on isActive value", () => {
		test("matching value for isActive equals true", () => {
			testData.isActive = true;
			render(<ChatMoreInfo infoData={testData} />);

			expect(screen.getByLabelText("Active status of user")).toHaveTextContent("🟢 Active now");
		});

		test("matching value for isActive equals false", () => {
			testData.isActive = false;
			render(<ChatMoreInfo infoData={testData} />);
			
			expect(screen.getByLabelText("Active status of user")).toHaveTextContent("🔴 Last seen testLastSeen");
		});
	});
});
