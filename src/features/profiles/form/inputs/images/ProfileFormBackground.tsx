import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { fileValidation } from "../../../../../utils/validationTemplates";
import useFilePreview from "../../../../../hooks/useFilePreview";
import Heading from "../../../../../ui/Heading";
import ContainerImageEditor from "../../../../../ui/ContainerImageEdit";
import HiddenInput from "../../../../../ui/HiddenInput";
import ErrorMessage from "../../../../../ui/ErrorMessage";

const StyledProfileFormBackground = styled.div`
	flex: 1;
`;

const BackgroundPreview = styled.img`
	width: 20rem;
	height: 12rem;
	border-radius: var(--border-radius-md);
`;

const Edit = styled.span`
	color: var(--color-white-100);
`;

const ProfileFormBackground = ({ background }: { background: string }) => {
	const { register, formState, watch } = useFormContext();
	const backgroundWatcher = watch("background");
	const { imgSrc: backgroundSrc } = useFilePreview(backgroundWatcher);

	const currentBackgroundSrc = backgroundSrc || background || "/background-default.jpg";

	return (
		<StyledProfileFormBackground aria-label="Background input section">
			<Heading
				as="h3"
				center
			>
				Background
			</Heading>
			<ContainerImageEditor>
				<BackgroundPreview src={currentBackgroundSrc} />
				<label htmlFor="backgroundUpload">
					<Edit>Edit</Edit>
				</label>
				<HiddenInput
					id="backgroundUpload"
					type="file"
					placeholder="Background"
					accept="image/jpeg, image/png"
					{...register("background", { validate: (value) => fileValidation(value, ["jpg", "jpeg", "png"]) })}
				/>
			</ContainerImageEditor>

			{formState.errors["background"] && <ErrorMessage>{get(formState.errors, "background").message}</ErrorMessage>}
		</StyledProfileFormBackground>
	);
};

export default ProfileFormBackground;
