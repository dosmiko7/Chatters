import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { FaPaperclip } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

import { Button } from "../../../ui/Button";
import { flexCentered } from "../../../style/Templates";

const Attachment = styled.div`
	position: relative;
	height: 70%;
	width: 100%;
	margin-top: auto;
`;

const NoAttachment = styled.div`
	${flexCentered};
	opacity: 0.5;
	font-size: 2rem;
	gap: 0.6rem;
	height: 70%;
	width: 100%;
`;

const AttachmentPreview = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: var(--border-radius-sm);
`;

const CloseButton = styled(Button)`
	background-color: var(--color-primary-500);
	position: absolute;
	top: 10px;
	right: 10px;
`;

const DashboardFormAttachment = ({ currentSrc }: { currentSrc: string | null }) => {
	const { resetField } = useFormContext();

	const onCloseHandler = () => {
		resetField("gif");
		resetField("file");
	};

	if (!currentSrc)
		return (
			<NoAttachment>
				<FaPaperclip />
				<p>No attachment</p>
			</NoAttachment>
		);

	return (
		<Attachment>
			<AttachmentPreview src={currentSrc} />
			<CloseButton
				variant="menu"
				size="large"
				type="button"
				onClick={() => onCloseHandler()}
			>
				<HiXMark />
			</CloseButton>
		</Attachment>
	);
};

export default DashboardFormAttachment;
