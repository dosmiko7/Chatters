import { useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import { FaPaperclip } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

import useFilePreview from "../../../hooks/useFilePreview";
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
	border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
`;

const CloseButton = styled(Button)`
	background-color: var(--color-primary-500);
	position: absolute;
	top: 10px;
	right: 10px;
`;

const DashboardFormAttachment = () => {
	const { resetField } = useFormContext();
	const fileWatcher: FileList | null = useWatch({ name: "file" });
	const gifSrc: string = useWatch({ name: "gif" });
	const { imgSrc } = useFilePreview(fileWatcher);

	const currentSrc = gifSrc || imgSrc;

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
