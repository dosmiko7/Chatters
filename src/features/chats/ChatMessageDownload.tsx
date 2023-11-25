import { BiDownload } from "react-icons/bi";
import styled from "styled-components";

import { flexRow } from "../../style/Templates";
import { Button } from "../../ui/Button";

const StyledDownloadMessage = styled.div`
	${flexRow};
	align-items: center;
	gap: 0.4rem;
	padding: var(--padding-sm);
	border: 1px solid var(--color-secondary-300);
	border-radius: var(--border-radius-sm);
`;

const FileName = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ChatMessageDownload = ({ filename }: { filename: string | undefined }) => {
	return (
		<StyledDownloadMessage>
			<Button
				type="button"
				variant="menu"
			>
				<BiDownload />
			</Button>
			<FileName>{filename || "file"}</FileName>
		</StyledDownloadMessage>
	);
};

export default ChatMessageDownload;
