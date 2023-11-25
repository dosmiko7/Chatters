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
}

const ChatForm = () => {
	const methods = useForm<IChatFormInput>({ defaultValues: { message: "", file: null } });
	const { sendMessage, status } = useSendMessage();
	const { watch, handleSubmit } = methods;

	const fileWatch = watch("file");

	const onSubmit: SubmitHandler<IChatFormInput> = (input: IChatFormInput) => {
		console.log(input);
		if (input.message.length) sendMessage(input.message);
		if (input.file?.length) sendMessage(input.file);
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
