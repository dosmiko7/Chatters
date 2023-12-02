import { ReactNode } from "react";
import styled, { css } from "styled-components";

import ThreeDots from "../../../ui/ThreeDots";
import { flexRow } from "../../../style/Templates";

interface IContainerProps {
	status?: string;
}

const StyledContainer = styled.div<IContainerProps>`
	${flexRow}
	align-items: center;
	position: relative;
	border-radius: var(--border-radius-md);

	${(props) =>
		props.status === "pending" &&
		css`
			pointer-events: none;
			filter: blur(3px) grayscale(20%);

			&:hover {
				cursor: disabled;
			}
		`}
`;

const ChatFormInputsContainer = ({ status, children }: { status: string; children: ReactNode[] }) => {
	return (
		<>
			{status === "pending" && <ThreeDots />}
			<StyledContainer status={status}>{children}</StyledContainer>
		</>
	);
};

export default ChatFormInputsContainer;
