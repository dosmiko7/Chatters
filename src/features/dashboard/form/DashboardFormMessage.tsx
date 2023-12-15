import { useState } from "react";
import styled from "styled-components";

const StyledDashboardFormMessage = styled.div`
	position: relative;
	width: 100%;
	height: 60%;
	background-color: var(--color-primary-500);
	border-radius: var(--border-radius-sm);
`;

const Textarea = styled.textarea`
	background-color: transparent;
	width: 100%;
	height: 90%;
	resize: none;
	font-size: 1.8rem;
	padding: 0.6rem;

	&:focus {
		outline: none;
	}
`;

const Counter = styled.div`
	float: right;
	padding-right: 10px;
`;

const MAX_CHARS = 200;

const DashboardFormMessage = () => {
	const [charsCount, setCharsCount] = useState<number>(0);

	return (
		<StyledDashboardFormMessage>
			<Textarea
				maxLength={MAX_CHARS}
				onChange={(e) => setCharsCount(e.target.value.length)}
				placeholder="Post message..."
			/>
			<Counter>
				{charsCount} / {MAX_CHARS}
			</Counter>
		</StyledDashboardFormMessage>
	);
};

export default DashboardFormMessage;
