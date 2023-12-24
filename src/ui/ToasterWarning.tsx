import styled from "styled-components";
import { toast, Toast } from "react-hot-toast";

import { flexRow } from "../style/Templates";
import Button from "./Button";
import Paragraph from "./Paragraph";

const ToasterContent = styled.div`
	color: var(--font-color);
	text-align: center;
	gap: 0.4rem;
`;

const Buttons = styled.div`
	${flexRow};
	justify-content: space-between;
	margin-top: 1rem;
`;

const ToasterButton = styled(Button)`
	border-radius: var(--border-radius-xsm);
	width: 30%;
	justify-content: center;
`;

const ToasterWarning = ({ t, message, confirmHandler }: { t: Toast; message: string; confirmHandler: () => void }) => {
	const onConfirm = () => {
		confirmHandler();
		toast.dismiss(t.id);
	};

	return (
		<ToasterContent>
			<Paragraph>{message}</Paragraph>
			<span>
				<b>Do you want to continue?</b>
			</span>
			<Buttons>
				<ToasterButton
					variant="danger"
					onClick={() => onConfirm()}
				>
					<span>Yes</span>
				</ToasterButton>
				<ToasterButton
					variant="safe"
					onClick={() => toast.dismiss(t.id)}
				>
					<span>No</span>
				</ToasterButton>
			</Buttons>
		</ToasterContent>
	);
};

export default ToasterWarning;
