import { useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";

import DashboardFormAttachment from "./DashboardFormAttachment";
import { flexColumn } from "../../../style/Templates";

interface IStyledMessageProps {
	error: boolean;
}

const StyledDashboardFormMessage = styled.div`
	${flexColumn};
	width: 100%;
	height: 80%;
	background-color: var(--color-primary-500);
	border-radius: var(--border-radius-sm);
`;

const TextContainer = styled.div`
	height: 20%;
`;

const Textarea = styled.textarea<IStyledMessageProps>`
	background-color: transparent;
	width: 100%;
	resize: none;
	font-size: 1.8rem;
	padding: 0.6rem;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${(props) => (props.error ? "var(--color-red-200)" : "inherit")};
		opacity: 0.6;
	}
`;

const Counter = styled.div`
	float: right;
	padding-right: 10px;
`;

const MAX_CHARS = 200;

const DashboardFormMessage = () => {
	const { register, formState } = useFormContext();
	const messageWatcher: string = useWatch({ name: "message" });

	const placeholder = formState.errors["message"] ? "Enter some message" : "Post message...";
	return (
		<StyledDashboardFormMessage>
			<TextContainer>
				<Textarea
					maxLength={MAX_CHARS}
					placeholder={placeholder}
					error={!!formState.errors["message"]}
					{...register("message", { required: true, maxLength: MAX_CHARS })}
				/>
				<Counter>
					{messageWatcher.length} / {MAX_CHARS}
				</Counter>
			</TextContainer>
			<DashboardFormAttachment />
		</StyledDashboardFormMessage>
	);
};

export default DashboardFormMessage;

//onChange={(e) => setCharsCount(e.target.value.length)}
