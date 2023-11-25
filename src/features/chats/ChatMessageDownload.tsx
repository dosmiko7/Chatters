import { BiDownload } from "react-icons/bi";
import styled from "styled-components";
import { flexRow } from "../../style/Templates";
import { Button } from "../../ui/Button";

const StyledDownloadMessage = styled.div`
	${flexRow};
	align-items: center;
	border: 1px solid var(--color-secondary-300);
	border-radius: var(--border-radius-sm);
`;

const FileName = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ChatMessageDownload = ({ filename }: { filename: string }) => {
	return (
		<StyledDownloadMessage>
			<Button
				type="button"
				variant="menu"
				size="small"
			>
				<BiDownload />
			</Button>
			<FileName>{filename}</FileName>
		</StyledDownloadMessage>
	);
};

export default ChatMessageDownload;
