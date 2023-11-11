import { FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

import { IProfileFormFieldProps } from "./ProfileFormWindow";
import { flexRow } from "../../../style/Templates";
import { Wrapper } from "../../../ui/Wrapper";

const StyledImages = styled.div`
	${flexRow}
	justify-content: space-between;
`;

const ProfileFormImages = <T extends FieldValues>(props: IProfileFormFieldProps<T>) => {
	const { register, errors } = props;

	const fileSizeValidation = (value: File[]) => {
		console.log(value[0]);
		const file = value[0];
		const maxSizeInBytes = 1024 * 1024;

		return file.size <= maxSizeInBytes || "File size should be less than 1 MB";
	};

	return (
		<StyledImages>
			<Wrapper>
				<label htmlFor="avatarUpload">Avatar</label>
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
				<label htmlFor="backgroundUpload">Background</label>
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
