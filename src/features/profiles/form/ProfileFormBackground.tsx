import { FieldValues, Path } from "react-hook-form";
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";

import useFilePreview from "./useFilePreview";
import { IProfileFormBackgroundProps } from "./ProfileFormImages";
import { Wrapper } from "../../../ui/Wrapper";

const EditorContainer = styled.div``;

const BackgroundPreview = styled.img`
	width: 20rem;
	height: 12rem;
	border-radius: var(--border-radius-md);
`;

const ProfileFormBackground = <T extends FieldValues>(
	props: IProfileFormBackgroundProps<T> & { validation: (value: File[]) => true | string }
) => {
	const { register, errors, backgroundWatcher, validation } = props;
	const { imgSrc: backgroundSrc } = useFilePreview(backgroundWatcher);

	// TODO: Instead default values get values from server
	const currentBackgroundSrc = backgroundSrc || "/background-default.jpg";

	return (
		<Wrapper>
			<EditorContainer>
				<BackgroundPreview src={currentBackgroundSrc} />
				<label htmlFor="backgroundUpload">
					<BiPencil />
				</label>
				<input
					id="backgroundUpload"
					type="file"
					placeholder="Background"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					{...register("background" as Path<T>, { validate: validation })}
				/>
			</EditorContainer>

			{errors["background"] && <p>{errors["background"].message?.toString()}</p>}
		</Wrapper>
	);
};

export default ProfileFormBackground;
