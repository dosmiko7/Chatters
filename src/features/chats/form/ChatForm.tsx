import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import useSendMessage from "./useSendMessage";
import { Form } from "../../../ui/Form";
import ChatFormMessage from "./ChatFormMessage";
import styled from "styled-components";
import ChatFormAdditional from "./ChatFormAdditional";

const StyledChatForm = styled(Form)`
	flex-direction: row;
	align-items: center;
`;

export interface IChatFormInput {
	message: string;
	file: FileList | null;
	gif: string;
}

const ChatForm = () => {
	const methods = useForm<IChatFormInput>({ defaultValues: { message: "", file: null, gif: "" } });
	const { sendMessage, status } = useSendMessage();
	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<IChatFormInput> = (input: IChatFormInput) => {
		console.log(input);
		// if (input.message.length) sendMessage(input.message);
		// if (input.file?.length) sendMessage(input.file);
		if (input.gif.length) sendMessage({ type: "image/gif", message: input.gif });
	};

	return (
		<FormProvider {...methods}>
			<StyledChatForm onSubmit={handleSubmit(onSubmit)}>
				<ChatFormAdditional />
				<ChatFormMessage status={status} />
			</StyledChatForm>
		</FormProvider>
	);
};

export default ChatForm;
