import styled from "styled-components";
import { toast, Toast } from "react-hot-toast";
import { BiSolidTrash, BiSolidUpArrowAlt } from "react-icons/bi";

import { Button } from "../../ui/Button";
import { flexRow } from "../../style/Templates";

const ToasterContent = styled.div`
	color: var(--toaster-font-color);
	text-align: center;
	gap: 0.4rem;
`;

const Buttons = styled.div`
	${flexRow};
	justify-content: space-between;
	margin-top: 1rem;
`;

const ProfileFriendWarning = ({ t, removeHandler }: { t: Toast; removeHandler: () => void }) => {
	const onRemoveFriend = () => {
		removeHandler();
		toast.dismiss(t.id);
	};

	return (
		<ToasterContent>
			<p>Removing a user from your friends list will also delete all messages with that user.</p>
			<span>
				<b>Do you want to continue?</b>
			</span>
			<Buttons>
				<Button
					variant="danger"
					onClick={() => onRemoveFriend()}
				>
					<BiSolidTrash /> <span>Yes</span>
				</Button>
				<Button
					variant="confirm"
					onClick={() => toast.dismiss(t.id)}
				>
					<BiSolidUpArrowAlt /> <span>No</span>
				</Button>
			</Buttons>
		</ToasterContent>
	);
};

export default ProfileFriendWarning;
