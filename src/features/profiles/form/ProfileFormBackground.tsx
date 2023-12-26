import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "../../../hooks/useFilePreview";

import Heading from "../../../ui/Heading";
import ContainerImageEditor from "../../../ui/ContainerImageEdit";
import HiddenInput from "../../../ui/HiddenInput";
import ErrorMessage from "../../../ui/ErrorMessage";

const StyledContainer = styled(ContainerImageEditor)`
	border-radius: var(--border-radius-md);
`;

const BackgroundPreview = styled.img`
	width: 20rem;
	height: 12rem;
	border-radius: var(--border-radius-md);
`;

const Edit = styled.span`
	color: var(--color-white-100);
`;

const ProfileFormBackground = (props: { watcher: FileList | null; validation: (value: FileList) => true | string }) => {
	const { watcher, validation } = props;

	const { register, formState } = useFormContext();
	const { imgSrc: backgroundSrc } = useFilePreview(watcher);

	// TODO: Instead default values get values from server
	const currentBackgroundSrc = backgroundSrc || "/background-default.jpg";

	return (
		<div>
			<Heading as="h3">Background</Heading>
			<StyledContainer>
				<BackgroundPreview src={currentBackgroundSrc} />
				<label htmlFor="backgroundUpload">
					<Edit>Edit</Edit>
				</label>
				<HiddenInput
					id="backgroundUpload"
					type="file"
					placeholder="Background"
					accept="image/jpeg, image/png"
					{...register("background", { validate: validation })}
				/>
			</StyledContainer>

			{formState.errors["background"] && <ErrorMessage>{get(formState.errors, "background").message}</ErrorMessage>}
		</div>
	);
};

export default ProfileFormBackground;
