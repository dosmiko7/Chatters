import { FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "./useFilePreview";
import { IProfileFormImageProps } from "./ProfileFormImages";
import { Wrapper } from "../../../ui/Wrapper";
import Heading from "../../../ui/Heading";
import ContainerImageEditor from "../../../ui/ContainerImageEdit";

const StyledContainer = styled(ContainerImageEditor)`
	border-radius: var(--border-radius-circle);
`;

const AvatarPreview = styled.img`
	width: 12rem;
	height: 12rem;
	border-radius: var(--border-radius-circle);
`;

const ProfileFormAvatar = <T extends FieldValues>(
	props: IProfileFormImageProps<T> & { validation: (value: File[]) => true | string }
) => {
	const { register, errors, watcher, validation } = props;
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
				<input
					id="avatarUpload"
					type="file"
					placeholder="Avatar"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					{...register("avatar" as Path<T>, { validate: validation })}
				/>
			</StyledContainer>

			{errors["avatar"] && <p>{errors["avatar"].message?.toString()}</p>}
		</Wrapper>
	);
};

export default ProfileFormAvatar;
