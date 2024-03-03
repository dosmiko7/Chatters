import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import DashboardListAttachment from "../DashboardListAttachment";

vi.mock("../../../../ui/AudioElement", () => {
	return {
		default: () => <div>AudioElement</div>,
	};
});

vi.mock("../../../../ui/VideoElement", () => {
	return {
		default: () => <div>VideoElement</div>,
	};
});

vi.mock("../../../../ui/ImageElement", () => {
	return {
		default: () => <div>ImageElement</div>,
	};
});

vi.mock("../../../../ui/DownloadElement", () => {
	return {
		default: () => <div>DownloadElement</div>,
	};
});

describe("DashboardListAttachment", () => {
	test("should render AudioElement if type includes audio", () => {
		render(
			<DashboardListAttachment
				type="audio/mp3"
				file="exampleAudio.mp3"
			/>
		);

		expect(screen.getByText("AudioElement"));
	});

	test("should render VideoElement if type includes video", () => {
		render(
			<DashboardListAttachment
				type="video/mp4"
				file="exampleVideo.mp4"
			/>
		);

		expect(screen.getByText("VideoElement"));
	});

	test("should render ImageElement if type includes image", () => {
		render(
			<DashboardListAttachment
				type="image/png"
				file="exampleImage.png"
			/>
		);

		expect(screen.getByText("ImageElement"));
	});

	test("should render DownloadElement if type does not include audio or video or image", () => {
		render(
			<DashboardListAttachment
				type="text/plain"
				file="exampleText.txt"
			/>
		);

		expect(screen.getByText("DownloadElement"));
	});
});
