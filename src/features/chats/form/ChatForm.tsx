import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../../ui/Form";
import { Input } from "../../../ui/Input";
import useSendMessage from "./useSendMessage";

interface IChatFormInput {
	message: string;
}

const ChatForm = () => {
	const methods = useForm<IChatFormInput>();
	const { sendMessage, status } = useSendMessage();
	const { register, handleSubmit } = methods;
	// 1. Input message
	// 1b. How to handle images/gifs/videos?
	// 2. Send message to chats collection
	// 3. Update object in userChats collectione
	const onSubmit: SubmitHandler<IChatFormInput> = (input: IChatFormInput) => {
		sendMessage(input.message);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Input
				disabled={status === "pending"}
				placeholder="Message..."
				type="text"
				{...register("message")}
			/>
		</Form>
	);
};

export default ChatForm;
