import { lazy } from "react";
import { BiPencil } from "react-icons/bi";

import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import withLoader from "../../../hocs/withLoader";
const ProfileForm = lazy(() => import("./ProfileForm"));

const ProfileFormWithLoader = withLoader({
	componentToSuspense: ProfileForm,
});

const ProfileFormModal = ({ images }: { images: { avatar: string; background: string } }) => {
	return (
		<Modal>
			<Modal.Open opens="profileForm">
				<Button
					variant="profile"
					size="small"
				>
					<BiPencil style={{ fontSize: "2.4rem" }} />
					<span>Edit profile</span>
				</Button>
			</Modal.Open>

			<Modal.Window
				name="profileForm"
				height="100dvh"
				width="70rem"
			>
				<ProfileFormWithLoader images={images} />
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
