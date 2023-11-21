import { useFormContext } from "react-hook-form";
import { Input } from "../../../ui/Input";
import styled from "styled-components";

const StyledMessageInput = styled(Input)`
	padding: var(--padding-xsm) var(--padding-sm);
	background-color: var(--color-primary-300);
	height: 80%;
	flex-grow: 1;

	&:hover {
		background-color: var(--color-primary-300);
	}
`;

const ChatFormMessage = ({ status }: { status: string }) => {
	const { register } = useFormContext();

	return (
		<StyledMessageInput
			disabled={status === "pending"}
			placeholder="Message..."
			type="text"
			{...register("message")}
		/>
	);
};

export default ChatFormMessage;
