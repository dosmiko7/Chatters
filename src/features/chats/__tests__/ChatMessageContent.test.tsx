import { screen, render, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatMessageContent from "../ChatMessageContent";

vi.mock("../../../ui/ImageElement", () => {
	return {
		default: (props: any) => (
			<div data-testid="ImageElement">
				<span>{props.fileUrl}</span>
			</div>
		),
	};
});

vi.mock("../../../ui/AudioElement", () => {
	return {
		default: (props: any) => (
			<div data-testid="AudioElement">
				<span>{props.fileSrc}</span>
				<span>{props.type}</span>
			</div>
		),
	};
});

vi.mock("../../../ui/VideoElement", () => {
	return {
		default: (props: any) => (
			<div data-testid="VideoElement">
				<span>{props.fileSrc}</span>
				<span>{props.type}</span>
			</div>
		),
	};
});

vi.mock("../../../ui/DownloadElement", () => {
	return {
		default: (props: any) => (
			<div data-testid="DownloadElement">
				<span>{props.fileUrl}</span>
				<span>{props.filename}</span>
			</div>
		),
	};
});

describe("ChatMessageContent", () => {
	const testData = {
		type: "text",
		message: "testMessage",
		fileName: "testFileName",
		theme: { name: "testThemeName", fontColor: "testThemeFontColor" },
		isLeftMessage: true,
	};

	test("render properly", () => {
		render(<ChatMessageContent data={testData} />);

		const content = screen.getByRole("wrapper");
		expect(content).toBeInTheDocument();
		expect(within(content).getByRole("paragraph").textContent).toBe("testMessage");
	});

	describe("render type of content correctly with passed props", () => {
		test("should render normal size of Paragraph if passed type is text", () => {
			testData.type = "text";
			render(<ChatMessageContent data={testData} />);

			const paragraph = screen.getByRole("paragraph");
			expect(paragraph).toBeInTheDocument();
			expect(paragraph.textContent).toBe("testMessage");
		});

		test("should render large size of Paragraph if passed type is emoji", () => {
			testData.type = "emoji";
			render(<ChatMessageContent data={testData} />);

			const paragraph = screen.getByRole("paragraph");
			expect(paragraph).toBeInTheDocument();
			expect(paragraph).toHaveAttribute("style", `font-size: 3rem;`);
			expect(paragraph.textContent).toBe("testMessage");
		});

		test("should render ImageElement if passed type is image", () => {
			testData.type = "image";
			render(<ChatMessageContent data={testData} />);

			const imageElement = screen.getByTestId("ImageElement");
			expect(imageElement).toBeInTheDocument();
			expect(screen.getByText("testMessage"));
		});

		test("should render AudioElement if passed type is audio", () => {
			testData.type = "audio";
			render(<ChatMessageContent data={testData} />);

			const audioElement = screen.getByTestId("AudioElement");
			expect(audioElement).toBeInTheDocument();
			expect(screen.getByText("testMessage"));
			expect(screen.getByText("audio"));
		});

		test("should render VideoElement if passed type is video", () => {
			testData.type = "video";
			render(<ChatMessageContent data={testData} />);

			const videoElement = screen.getByTestId("VideoElement");
			expect(videoElement).toBeInTheDocument();
			expect(screen.getByText("testMessage"));
			expect(screen.getByText("video"));
		});

		test("should render DownloadElement by default", () => {
			testData.type = "default";
			render(<ChatMessageContent data={testData} />);

			const downloadElement = screen.getByTestId("DownloadElement");
			expect(downloadElement).toBeInTheDocument();
			expect(screen.getByText("testMessage"));
			expect(screen.getByText("testFileName"));
		});
	});

	test("should apply correct style based on isLeftMessage value", () => {
		render(<ChatMessageContent data={testData} />);

		const content = screen.getByRole("wrapper");
		expect(content).toHaveAttribute("style", "background-color: var(--testThemeName-chat-left);");
	});
});
