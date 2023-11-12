import { FieldValues } from "react-hook-form";
import styled from "styled-components";

import { IProfileFormFieldProps } from "./ProfileFormWindow";
import { flexRow } from "../../../style/Templates";
import isFileExtensionValid from "../../../utils/isFileExtensionValid";
import ProfileFormAvatar from "./ProfileFormAvatar";
import ProfileFormBackground from "./ProfileFormBackground";

const StyledImages = styled.div`
	${flexRow}
	justify-content: space-between;
`;
interface IProfileFormImagesProps<T extends FieldValues> extends IProfileFormFieldProps<T> {
	avatarWatcher: File[];
	backgroundWatcher: File[];
}

export interface IProfileFormImageProps<T extends FieldValues> extends IProfileFormFieldProps<T> {
	watcher: File[];
}

const ProfileFormImages = <T extends FieldValues>(props: IProfileFormImagesProps<T>) => {
	const { register, errors, avatarWatcher, backgroundWatcher } = props;

	const fileValidation = (value: File[]) => {
		if (value.length) {
			const file = value[0];
			const maxSizeInBytes = 1024 * 1024;
			const allowedExtensions = ["jpg", "jpeg", "png"];

			if (!isFileExtensionValid(file.name, allowedExtensions)) {
				return "Only JPG and PNG are allowed.";
			}

			if (file.size > maxSizeInBytes) {
				return "File size should be less than 1 MB";
			}
		}

		return true;
	};

	return (
		<StyledImages>
			<ProfileFormAvatar<T>
				register={register}
				errors={errors}
				watcher={avatarWatcher}
				validation={fileValidation}
			/>
			<ProfileFormBackground<T>
				register={register}
				errors={errors}
				watcher={backgroundWatcher}
				validation={fileValidation}
			/>
		</StyledImages>
	);
};

export default ProfileFormImages;
