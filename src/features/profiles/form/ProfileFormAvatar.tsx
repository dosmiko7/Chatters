import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "../../../hooks/useFilePreview";
import { Wrapper } from "../../../ui/Wrapper";
import Heading from "../../../ui/Heading";
import ContainerImageEditor from "../../../ui/ContainerImageEdit";
import HiddenInput from "../../../ui/HiddenInput";

const StyledContainer = styled(ContainerImageEditor)`
	border-radius: var(--border-radius-circle);
`;

const AvatarPreview = styled.img`
	width: 12rem;
	height: 12rem;
	border-radius: var(--border-radius-circle);
`;

const ProfileFormAvatar = (props: { watcher: FileList | null; validation: (value: FileList) => true | string }) => {
	const { watcher, validation } = props;

	const { register, formState } = useFormContext();
	const { imgSrc: avatarSrc } = useFilePreview(watcher);

	// TODO: Instead default values get values from server
	const currentAvatarSrc = avatarSrc || "/avatar-default.png";

	return (
		<Wrapper>
			<Heading as="h3">Avatar</Heading>
			<StyledContainer>
				<AvatarPreview src={currentAvatarSrc} />
				<label htmlFor="avatarUpload">
					<span>Edit</span>
				</label>
				<HiddenInput
					id="avatarUpload"
					type="file"
					placeholder="Avatar"
					accept="image/jpeg, image/png"
					{...register("avatar", { validate: validation })}
				/>
			</StyledContainer>

			{formState.errors["avatar"] && <p>{get(formState.errors, "avatar").message}</p>}
		</Wrapper>
	);
};

export default ProfileFormAvatar;
