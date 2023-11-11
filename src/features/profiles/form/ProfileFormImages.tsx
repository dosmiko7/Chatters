import { FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

import { IProfileFormFieldProps } from "./ProfileFormWindow";
import { flexRow } from "../../../style/Templates";
import { Wrapper } from "../../../ui/Wrapper";
import { BiPencil } from "react-icons/bi";
import useFilePreview from "./useFilePreview";

const StyledImages = styled.div`
	${flexRow}
	justify-content: space-between;
`;

export interface IProfileFormImagesProps<T extends FieldValues> extends IProfileFormFieldProps<T> {
	avatarWatcher: File[];
	backgroundWatcher: File[];
}

// TODO: Maybe split Inputs to separate components
const ProfileFormImages = <T extends FieldValues>(props: IProfileFormImagesProps<T>) => {
	const { register, errors, avatarWatcher, backgroundWatcher } = props;
	const { imgSrc: avatarSrc } = useFilePreview(avatarWatcher);
	const { imgSrc: backgroundSrc } = useFilePreview(backgroundWatcher);

	const fileSizeValidation = (value: File[]) => {
		const file = value[0];
		const maxSizeInBytes = 1024 * 1024;

		return file.size <= maxSizeInBytes || "File size should be less than 1 MB";
	};

	// TODO: Instead default values get values from server
	const currentAvatarSrc = avatarSrc || "/avatar-default.png";
	const currentBackgroundSrc = backgroundSrc || "/background-default.jpg";

	return (
		<StyledImages>
			<Wrapper>
				<img
					src={currentAvatarSrc}
					style={{ width: "30px", height: "30px" }}
				/>
				<label htmlFor="avatarUpload">
					<BiPencil />
				</label>
				<input
					id="avatarUpload"
					type="file"
					placeholder="Avatar"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					{...register("avatar" as Path<T>, { validate: fileSizeValidation })}
				/>
				{errors["avatar"] && <p>{errors["avatar"].message?.toString()}</p>}
			</Wrapper>
			<Wrapper>
				<img
					src={currentBackgroundSrc}
					style={{ width: "30px", height: "30px" }}
				/>
				<label htmlFor="backgroundUpload">
					<BiPencil />
				</label>
				<input
					id="backgroundUpload"
					type="file"
					placeholder="Background"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					{...register("background" as Path<T>, { validate: fileSizeValidation })}
				/>
				{errors["background"] && <p>{errors["background"].message?.toString()}</p>}
			</Wrapper>
		</StyledImages>
	);
};

export default ProfileFormImages;
