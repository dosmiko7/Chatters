import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import isFileExtensionValid from "../../../utils/isFileExtensionValid";
import ProfileFormAvatar from "./ProfileFormAvatar";
import ProfileFormBackground from "./ProfileFormBackground";

const StyledImages = styled.div`
	${flexRow}
	justify-content: space-between;
`;
interface IProfileFormImagesProps {
	avatarWatcher: File[] | null;
	backgroundWatcher: File[] | null;
}

const ProfileFormImages = (props: IProfileFormImagesProps) => {
	const { avatarWatcher, backgroundWatcher } = props;

	const fileValidation = (value: File[] | null) => {
		if (value?.length) {
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
			<ProfileFormAvatar
				watcher={avatarWatcher}
				validation={fileValidation}
			/>
			<ProfileFormBackground
				watcher={backgroundWatcher}
				validation={fileValidation}
			/>
		</StyledImages>
	);
};

export default ProfileFormImages;
