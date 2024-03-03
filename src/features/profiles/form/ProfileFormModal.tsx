import { Suspense, lazy } from "react";
import { BiPencil } from "react-icons/bi";

import Modal from "../../../ui/Modal";
import ThreeDots from "../../../ui/ThreeDots";
import Button from "../../../ui/Button";
const ProfileForm = lazy(() => import("./ProfileForm"));

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
				<Suspense fallback={<ThreeDots />}>
					<ProfileForm images={images} />
				</Suspense>
			</Modal.Window>
		</Modal>
	);
};

export default ProfileFormModal;
