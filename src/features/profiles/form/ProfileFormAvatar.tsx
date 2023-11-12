import { FieldValues, Path } from "react-hook-form";
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";

import useFilePreview from "./useFilePreview";
import { IProfileFormAvatarProps } from "./ProfileFormImages";
import { Wrapper } from "../../../ui/Wrapper";

const EditorContainer = styled.div``;

const AvatarPreview = styled.img`
	width: 12rem;
	height: 12rem;
	border-radius: var(--border-radius-circle);
`;

const ProfileFormAvatar = <T extends FieldValues>(
	props: IProfileFormAvatarProps<T> & { validation: (value: File[]) => true | string }
) => {
	const { register, errors, avatarWatcher, validation } = props;
	const { imgSrc: avatarSrc } = useFilePreview(avatarWatcher);

	// TODO: Instead default values get values from server
	const currentAvatarSrc = avatarSrc || "/avatar-default.png";

	return (
		<Wrapper>
			<EditorContainer>
				<AvatarPreview src={currentAvatarSrc} />
				<label htmlFor="avatarUpload">
					<BiPencil />
				</label>
				<input
					id="avatarUpload"
					type="file"
					placeholder="Avatar"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					{...register("avatar" as Path<T>, { validate: validation })}
				/>
			</EditorContainer>

			{errors["avatar"] && <p>{errors["avatar"].message?.toString()}</p>}
		</Wrapper>
	);
};

export default ProfileFormAvatar;
