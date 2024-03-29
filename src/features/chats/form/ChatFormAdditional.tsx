import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import ChatFormFile from "./ChatFormFile";
import ChatFormGIF from "./ChatFormGIF";

const StyledFilesInputs = styled.div`
	${flexRow};
	align-items: center;
	gap: 1rem;
	padding: var(--padding-sm);
	font-size: 2.2rem;
`;

const ChatFormAdditional = () => {
	return (
		<StyledFilesInputs>
			<ChatFormFile />
			<ChatFormGIF />
		</StyledFilesInputs>
	);
};

export default ChatFormAdditional;
