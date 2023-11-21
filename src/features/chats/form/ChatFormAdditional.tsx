import styled from "styled-components";
import ChatFormFile from "./ChatFormFile";
import ChatFormGIF from "./ChatFormGIF";
import { flexRow } from "../../../style/Templates";

const StyledFilesInputs = styled.div`
	${flexRow};
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
