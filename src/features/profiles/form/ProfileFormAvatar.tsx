import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "../../../hooks/useFilePreview";
import Heading from "../../../ui/Heading";
import ContainerImageEditor from "../../../ui/ContainerImageEdit";
import HiddenInput from "../../../ui/HiddenInput";
import ErrorMessage from "../../../ui/ErrorMessage";

const StyledContainer = styled(ContainerImageEditor)`
	border-radius: var(--border-radius-circle);
`;

const AvatarPreview = styled.img`
	width: 12rem;
	height: 12rem;
	border-radius: var(--border-radius-circle);
`;

const Edit = styled.span`
	color: var(--color-white-100);
`;

const ProfileFormAvatar = ({
	avatar,
	validation,
}: {
	avatar: string;
	validation: (value: FileList) => true | string;
}) => {
	const { register, formState, watch } = useFormContext();
	const avatarWatcher = watch("avatar");
	const { imgSrc: avatarSrc } = useFilePreview(avatarWatcher);

	const currentAvatarSrc = avatarSrc || avatar || "/avatar-default.png";

	return (
		<div>
			<Heading as="h3">Avatar</Heading>
			<StyledContainer>
				<AvatarPreview src={currentAvatarSrc} />
				<label htmlFor="avatarUpload">
					<Edit>Edit</Edit>
				</label>
				<HiddenInput
					id="avatarUpload"
					type="file"
					placeholder="Avatar"
					accept="image/jpeg, image/png"
					{...register("avatar", { validate: validation })}
				/>
			</StyledContainer>

			{formState.errors["avatar"] && <ErrorMessage>{get(formState.errors, "avatar").message}</ErrorMessage>}
		</div>
	);
};

export default ProfileFormAvatar;
