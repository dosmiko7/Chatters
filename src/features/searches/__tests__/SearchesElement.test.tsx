import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import * as useWaveAnimationHooks from "../../../hooks/useWaveAnimation";
import SearchesElement from "../SearchesElement";

vi.mock("../../../ui/Avatar", () => {
	return {
		default: (props: any) => <div>{props.src}</div>,
	};
});

describe("SearchesElement", () => {
	const onClickHandlerMock = vi.fn();
	const handleAnimationMock = vi.fn();

	test("render properly", () => {
		vi.spyOn(useWaveAnimationHooks, "default").mockReturnValue({
			waves: [<div key="testWaveId">waves</div>],
			handleAnimation: handleAnimationMock,
		});

		render(
			<SearchesElement
				onClickHandler={onClickHandlerMock}
				avatar="testAvatar"
				nickname="testNickname"
			/>
		);

		const avatar = screen.getByText("testAvatar");
		expect(avatar).toBeInTheDocument();

		const nickname = screen.getByText("testNickname");
		expect(nickname).toBeInTheDocument();
	});

	test("should call useWaveAnimation on mouse down", async () => {
		vi.spyOn(useWaveAnimationHooks, "default").mockReturnValue({
			waves: [<div key="testWaveId">waves</div>],
			handleAnimation: handleAnimationMock,
		});

		render(
			<SearchesElement
				onClickHandler={onClickHandlerMock}
				avatar="testAvatar"
				nickname="testNickname"
			/>
		);

		const listItem = screen.getByRole("listitem");
		await userEvent.click(listItem);
		expect(handleAnimationMock).toBeCalled();
	});

	test("should call onClickHandler passed with props on mouse click", async () => {
		vi.spyOn(useWaveAnimationHooks, "default").mockReturnValue({
			waves: [<div key="testWaveId">waves</div>],
			handleAnimation: handleAnimationMock,
		});

		render(
			<SearchesElement
				onClickHandler={onClickHandlerMock}
				avatar="testAvatar"
				nickname="testNickname"
			/>
		);

		const listItem = screen.getByRole("listitem");
		await userEvent.click(listItem);
		expect(onClickHandlerMock).toBeCalled();
	});
});
