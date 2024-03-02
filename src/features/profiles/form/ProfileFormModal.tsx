import { Suspense, lazy } from "react";
import { BiPencil } from "react-icons/bi";

import Modal from "../../../ui/Modal";
import ThreeDots from "../../../ui/ThreeDots";
import ButtonProfile from "../../../ui/ButtonProfile";
const ProfileForm = lazy(() => import("./ProfileForm"));

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
				<Suspense fallback={<ThreeDots />}>
					<ProfileForm images={images} />
				</Suspense>
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
