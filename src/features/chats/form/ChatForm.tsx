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
	file: File[] | null;
}

const ChatForm = () => {
	const methods = useForm<IChatFormInput>();
	const { sendMessage, status } = useSendMessage();
	const { watch, handleSubmit } = methods;

	const fileWatch = watch("file");

	const onSubmit: SubmitHandler<IChatFormInput> = (input: IChatFormInput) => {
		console.log(input);
		//sendMessage(input.message);
	};

	return (
		<FormProvider {...methods}>
			<StyledChatForm onSubmit={handleSubmit(onSubmit)}>
				<ChatFormAdditional />
				<ChatFormMessage
					watcher={fileWatch}
					status={status}
				/>
			</StyledChatForm>
		</FormProvider>
	);
};

export default ChatForm;
