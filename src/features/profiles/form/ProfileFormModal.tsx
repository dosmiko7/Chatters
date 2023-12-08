import { BiPencil } from "react-icons/bi";

import Modal from "../../../ui/Modal";
import ProfileForm from "./ProfileForm";
import ButtonProfile from "../../../ui/ButtonProfile";

const ProfileFormModal = ({ isLoggedUserProfile }: { isLoggedUserProfile: boolean }) => {
	return (
		<Modal>
			{isLoggedUserProfile && (
				<Modal.Open opens="profileForm">
					<ButtonProfile>
						<BiPencil style={{ fontSize: "2.4rem" }} />
						<span>Edit profile</span>
					</ButtonProfile>
				</Modal.Open>
			)}

			<Modal.Window name="profileForm">
				<ProfileForm />
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
