import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import useSendMessage from "./useSendMessage";
import Form from "../../../ui/Form";
import ChatFormMessage from "./ChatFormMessage";
import ChatFormAdditional from "./ChatFormAdditional";
import ChatFormInputsContainer from "./ChatFormInputsContainer";
import ChatFormEmoji from "./ChatFormEmoji";
import HiddenInput from "../../../ui/HiddenInput";

const StyledChatForm = styled(Form)`
	width: 100%;
`;

export interface IChatFormInput {
	message: string;
	file: FileList | null;
	gif: string;
	emoji: string;
}

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

export default ChatForm;
