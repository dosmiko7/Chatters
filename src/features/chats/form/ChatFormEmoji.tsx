import { SubmitHandler, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { IChatFormInput } from "./ChatForm";
import { Wrapper } from "../../../ui/Wrapper";
import HiddenInput from "../../../ui/HiddenInput";

const EmojiLabel = styled.label`
	margin: 0 1rem;
	font-size: 2rem;

	&:hover {
		cursor: pointer;
	}
`;

const ChatFormEmoji = ({
	setEmoji,
	onSubmitHandler,
}: {
	setEmoji: string;
	onSubmitHandler: SubmitHandler<IChatFormInput>;
}) => {
	const { register } = useFormContext();

	return (
		<Wrapper>
			<EmojiLabel
				htmlFor="emoji"
				onClick={() => onSubmitHandler({ message: "", file: null, gif: "", emoji: setEmoji })}
			>
				{setEmoji}
			</EmojiLabel>
			<HiddenInput
				id="emoji"
				type="text"
				{...register("emoji")}
			/>
		</Wrapper>
	);
};

export default ChatFormEmoji;
