import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { Button } from "../../../ui/Button";

const EmojiLabel = styled.label`
	margin-left: 1rem;
`;

const ChatFormEmoji = ({ emoji }: { emoji: string }) => {
	const { register, setValue } = useFormContext();

	return (
		<>
			<EmojiLabel htmlFor="emoji">
				<Button
					variant="menu"
					onClick={() => setValue("emoji", emoji)}
				>
					{emoji}
				</Button>
			</EmojiLabel>
			<input
				{...register("emoji")}
				type="submit"
				id={emoji}
				value={emoji}
				style={{ display: "none" }}
			/>
		</>
	);
};

export default ChatFormEmoji;
