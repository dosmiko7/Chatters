import { FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "./useFilePreview";
import { IProfileFormImageProps } from "./ProfileFormImages";
import { Wrapper } from "../../../ui/Wrapper";
import Heading from "../../../ui/Heading";
import ContainerImageEditor from "../../../ui/ContainerImageEdit";

const StyledContainer = styled(ContainerImageEditor)`
	border-radius: var(--border-radius-md);
`;

const BackgroundPreview = styled.img`
	width: 20rem;
	height: 12rem;
	border-radius: var(--border-radius-md);
`;

const ProfileFormBackground = <T extends FieldValues>(
	props: IProfileFormImageProps<T> & { validation: (value: File[]) => true | string }
) => {
	const { register, errors, watcher, validation } = props;
	const { imgSrc: backgroundSrc } = useFilePreview(watcher);

	// TODO: Instead default values get values from server
	const currentBackgroundSrc = backgroundSrc || "/background-default.jpg";

	return (
		<Wrapper>
			<Heading as="h3">Background</Heading>
			<StyledContainer>
				<BackgroundPreview src={currentBackgroundSrc} />
				<label htmlFor="backgroundUpload">
					<span>Edit</span>
				</label>
				<input
					id="backgroundUpload"
					type="file"
					placeholder="Background"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					{...register("background" as Path<T>, { validate: validation })}
				/>
			</StyledContainer>

			{errors["background"] && <p>{errors["background"].message?.toString()}</p>}
		</Wrapper>
	);
};

export default ProfileFormBackground;
