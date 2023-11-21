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

interface IChatFormInput {
	message: string;
	image: File[] | null;
}

const ChatForm = () => {
	const methods = useForm<IChatFormInput>();
	const { sendMessage, status } = useSendMessage();
	const { handleSubmit } = methods;
	// 1. Input message
	// 1b. How to handle images/gifs/videos?
	// 2. Send message to chats collection
	// 3. Update object in userChats collectione
	const onSubmit: SubmitHandler<IChatFormInput> = (input: IChatFormInput) => {
		sendMessage(input.message);
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
