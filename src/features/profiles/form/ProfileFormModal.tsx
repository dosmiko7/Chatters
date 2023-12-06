//import { useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";

import Modal from "../../../ui/Modal";
import ProfileForm from "./ProfileForm";
import ButtonProfile from "../../../ui/ButtonProfile";

const ProfileFormModal = () => {
	//const { userId: profileId } = useParams();

	return (
		<Modal>
			<Modal.Open opens="profileform">
				<ButtonProfile>
					<BiPencil style={{ fontSize: "2.4rem" }} />
					<span>Edit profil</span>
				</ButtonProfile>
			</Modal.Open>
			<Modal.Window name="profileform">
				<ProfileForm />
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
