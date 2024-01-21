import { useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import { FaPaperclip } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { BiFileBlank } from "react-icons/bi";

import useFilePreview from "../../../hooks/useFilePreview";
import { displayInfo, flexCentered, flexColumn } from "../../../style/Templates";
import Button from "../../../ui/Button";

const Attachment = styled.div`
	${flexCentered};
	position: relative;
	height: 70%;
	width: 100%;
	margin-top: auto;
`;

const NoAttachment = styled.div.attrs({
	"aria-label": "No attachment",
})`
	${flexCentered};
	opacity: 0.5;
	font-size: 2rem;
	gap: 0.6rem;
	height: 70%;
	width: 100%;
`;

const Name = styled.p`
	text-align: center;
`;

const AttachmentWithImage = styled.img.attrs({
	"aria-label": "Attachment with image",
})`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
`;

const AttachmentWithoutImage = styled.div.attrs({
	"aria-label": "Attachment without image",
})`
	${flexColumn};
	align-items: center;
	font-size: 2.4rem;
	width: 100%;

	p {
		width: 80%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const CloseButton = styled(Button)`
	${displayInfo({ message: "Remove attachment", position: "left" })}
	background-color: var(--color-primary-500);
	position: absolute;
	top: 10px;
	right: 10px;
`;

const DashboardFormAttachment = () => {
	const { setValue } = useFormContext();
	const fileWatcher: FileList | null = useWatch({ name: "file" });
	const gifSrc: string = useWatch({ name: "gif" });
	const { imgSrc } = useFilePreview(fileWatcher);

	const currentSrc = gifSrc || imgSrc;

	const onRemoveHandler = () => {
		setValue("gif", "");
		setValue("file", null);
	};

	let attachmentType;
	if (!currentSrc) {
		attachmentType = fileWatcher ? (
			<AttachmentWithoutImage>
				<BiFileBlank />
				<Name>{fileWatcher[0].name}</Name>
			</AttachmentWithoutImage>
		) : (
			<NoAttachment>
				<FaPaperclip />
				<p>No attachment</p>
			</NoAttachment>
		);
	} else {
		attachmentType = <AttachmentWithImage src={currentSrc} />;
	}

	return (
		<Attachment>
			{attachmentType}
			<CloseButton
				variant="menu"
				size="large"
				type="button"
				onClick={onRemoveHandler}
			>
				<HiXMark />
			</CloseButton>
		</Attachment>
	);
};

export default DashboardFormAttachment;
