import { get, useFormContext } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import styled from "styled-components";

import { linkValidation } from "../../../../../utils/validationTemplates";
import { socialIconStyle } from "../../../../../style/Templates";
import FlexColumn from "../../../../../ui/FlexColumn";
import InputProfileForm from "../../../../../ui/InputProfileForm";
import ErrorMessage from "../../../../../ui/ErrorMessage";

const InputContainer = styled.div`
	position: relative;
`;

const StyledInput = styled(InputProfileForm)`
	padding-left: 4rem;
`;

const StyledFaGithub = styled(FaGithub)`
	${socialIconStyle};
`;

const ProfileFormSocialGitHub = () => {
	const { register, formState } = useFormContext();
	const socialsErrors = formState.errors.socials;

	return (
		<FlexColumn aria-label="GitHub input section">
			<InputContainer>
				<StyledFaGithub />
				<StyledInput
					type="url"
					placeholder="Github"
					{...register("socials.github", linkValidation)}
				/>
			</InputContainer>
			{socialsErrors && <ErrorMessage>{get(socialsErrors, "github")?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default ProfileFormSocialGitHub;
