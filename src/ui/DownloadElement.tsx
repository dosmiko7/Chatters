import { BiDownload } from "react-icons/bi";
import styled from "styled-components";

import useDownloadFile from "../hooks/useDownloadFile";
import { flexRow } from "../style/Templates";
import Wrapper from "./Wrapper";
import Button from "./Button";
import Paragraph from "./Paragraph";

const StyledFileElement = styled(Wrapper)`
	${flexRow};
	align-items: center;
	gap: 0.4rem;
	padding: var(--padding-sm);
	border: 1px solid var(--color-secondary-300);
	border-radius: var(--border-radius-sm);
`;

const DownloadElement = ({ fileUrl, filename }: { fileUrl: string; filename?: string }) => {
	const { download, status } = useDownloadFile();

	const handleOnDownload = () => {
		download(fileUrl);
	};

	return (
		<StyledFileElement>
			<Button
				type="button"
				variant="menu"
				disabled={status === "pending"}
				onClick={handleOnDownload}
			>
				<BiDownload />
			</Button>
			{filename && <Paragraph>{filename}</Paragraph>}
		</StyledFileElement>
	);
};

export default DownloadElement;
