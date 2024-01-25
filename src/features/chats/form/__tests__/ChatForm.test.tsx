import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, logRoles, render, screen, waitFor } from "@testing-library/react";

import * as useSendMessageHooks from "../useSendMessage";
import ChatForm from "../ChatForm";

vi.mock("../ChatFormAdditional", () => {
	return {
		default: () => <div data-testid="ChatFormAdditional"></div>,
	};
});

vi.mock("../ChatFormMessage", () => {
	return {
		default: () => <div data-testid="ChatFormMessage"></div>,
	};
});

vi.mock("../ChatFormEmoji", () => {
	return {
		default: () => <div data-testid="ChatFormEmoji"></div>,
	};
});
/*
const ChatForm = ({ setEmoji }: { setEmoji: string }) => {
	const methods = useForm<IChatFormInput>({ defaultValues: { message: "", file: null, gif: "", emoji: "" } });
	const { sendMessage, status } = useSendMessage();
	const { handleSubmit, reset, resetField } = methods;

	const onSubmit: SubmitHandler<IChatFormInput> = async (input: IChatFormInput) => {
		if (input.gif.length) {
			await sendMessage({ type: "image/gif", message: input.gif });
			resetField("gif");
		} else if (input.emoji.length) {
			await sendMessage({ type: "emoji", message: input.emoji });
			resetField("emoji");
		} else {
			if (input.message.length) await sendMessage(input.message);
			if (input.file?.length) await sendMessage(input.file);
			reset();
		}
	};

	return (
		<FormProvider {...methods}>
			<StyledChatForm onSubmit={handleSubmit(onSubmit)}>
				<ChatFormInputsContainer status={status}>
					<ChatFormAdditional />
					<ChatFormMessage status={status} />
					<ChatFormEmoji
						setEmoji={setEmoji}
						onSubmitHandler={onSubmit}
					/>
				</ChatFormInputsContainer>
				<HiddenInput type="submit" />
			</StyledChatForm>
		</FormProvider>
	);
};
*/

describe("ChatForm", () => {
	const sendMessageMock = vi.fn();

	beforeEach(() => {
		vi.spyOn(useSendMessageHooks, "default").mockReturnValue({ sendMessage: sendMessageMock, status: "idle" });
	});

	test("render properly", () => {
		render(<ChatForm setEmoji="testEmoji" />);

		expect(screen.getByTestId("ChatFormAdditional")).toBeInTheDocument();
		expect(screen.getByTestId("ChatFormMessage")).toBeInTheDocument();
		expect(screen.getByTestId("ChatFormEmoji")).toBeInTheDocument();
	});

	test("should not call sendMessage on submit if inputs are empty", async () => {
		render(<ChatForm setEmoji="testEmoji" />);

		const chatForm = screen.getByLabelText("Chat form");
		fireEvent.submit(chatForm);
		await waitFor(() => expect(sendMessageMock).not.toBeCalled());
	});
});
