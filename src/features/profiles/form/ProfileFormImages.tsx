import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import isFileExtensionValid from "../../../utils/isFileExtensionValid";
import ProfileFormAvatar from "./ProfileFormAvatar";
import ProfileFormBackground from "./ProfileFormBackground";

const StyledImages = styled.div`
	${flexRow}
	justify-content: space-between;
`;

const fileValidation = (value: FileList | null) => {
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

const ProfileFormImages = () => {
	return (
		<StyledImages>
			<ProfileFormAvatar validation={fileValidation} />
			<ProfileFormBackground validation={fileValidation} />
		</StyledImages>
	);
};

export default ProfileFormImages;
