import { BiPencil } from "react-icons/bi";

import Modal from "../../../ui/Modal";
import ProfileForm from "./ProfileForm";
import ButtonProfile from "../../../ui/ButtonProfile";

const ProfileFormModal = ({ images }: { images: { avatar: string; background: string } }) => {
	return (
		<Modal>
			<Modal.Open opens="profileForm">
				<ButtonProfile>
					<BiPencil style={{ fontSize: "2.4rem" }} />
					<span>Edit profile</span>
				</ButtonProfile>
			</Modal.Open>

			<Modal.Window
				name="profileForm"
				height="100dvh"
				width="70rem"
			>
				<ProfileForm images={images} />
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
