import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "./useFilePreview";

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

const ProfileFormBackground = (props: { watcher: File[] | null; validation: (value: File[]) => true | string }) => {
	const { watcher, validation } = props;

	const { register, formState } = useFormContext();
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
					{...register("background", { validate: validation })}
				/>
			</StyledContainer>

			{formState.errors["background"] && <p>{get(formState.errors, "background").message}</p>}
		</Wrapper>
	);
};

export default ProfileFormBackground;
