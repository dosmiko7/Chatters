import { BiPencil } from "react-icons/bi";

import { Button } from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import ProfileForm from "./ProfileForm";

const ProfileFormModal = () => {
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
				<ProfileForm />
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
