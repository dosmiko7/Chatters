import { BiPencil } from "react-icons/bi";

import { Button } from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import ProfileFormWindow from "./ProfileFormWindow";

const ProfileForm = () => {
	return (
		<Modal>
			<Modal.Open opens="profileform">
				<Button
					variant="menu"
					size="medium"
				>
					<BiPencil />
				</Button>
			</Modal.Open>
			<Modal.Window name="profileform">
				<ProfileFormWindow />
			</Modal.Window>
		</Modal>
	);
};

export default ProfileForm;
