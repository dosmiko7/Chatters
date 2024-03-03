import { get, useFormContext } from "react-hook-form";
import { FaLinkedin } from "react-icons/fa6";
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

const StyledFaLinkedin = styled(FaLinkedin)`
	${socialIconStyle};
`;

const ProfileFormSocialLinkedin = () => {
	const { register, formState } = useFormContext();
	const socialsErrors = formState.errors.socials;

	return (
		<FlexColumn aria-label="Linkedin input section">
			<InputContainer>
				<StyledFaLinkedin />
				<StyledInput
					type="url"
					placeholder="Linkedin"
					{...register("socials.linkedin", linkValidation)}
				/>
			</InputContainer>
			{socialsErrors && <ErrorMessage>{get(socialsErrors, "linkedin")?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default ProfileFormSocialLinkedin;
