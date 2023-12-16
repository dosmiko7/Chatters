import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import { Button } from "../../../ui/Button";

const Attachment = styled.div`
	position: relative;
	height: 70%;
	width: 100%;
	margin-top: auto;
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

const DashboardFormAttachment = ({ currentSrc }: { currentSrc: string }) => {
	const { resetField } = useFormContext();

	const onCloseHandler = () => {
		resetField("gif");
		resetField("file");
	};

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
