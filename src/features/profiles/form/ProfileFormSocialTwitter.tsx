import { get, useFormContext } from "react-hook-form";
import { FaXTwitter } from "react-icons/fa6";
import styled from "styled-components";

import { linkValidation } from "../../../utils/validationTemplates";
import { socialIconStyle } from "../../../style/Templates";
import FlexColumn from "../../../ui/FlexColumn";
import InputProfileForm from "../../../ui/InputProfileForm";
import ErrorMessage from "../../../ui/ErrorMessage";

const InputContainer = styled.div`
	position: relative;
`;

const StyledInput = styled(InputProfileForm)`
	padding-left: 4rem;
`;

const StyledFaXTwitter = styled(FaXTwitter)`
	${socialIconStyle};
`;

const ProfileFormSocialTwitter = () => {
	const { register, formState } = useFormContext();
	const socialsErrors = formState.errors.socials;

	return (
		<FlexColumn aria-label="Twitter input section">
			<InputContainer>
				<StyledFaXTwitter />
				<StyledInput
					type="url"
					placeholder="Twitter"
					{...register("socials.twitter", linkValidation)}
				/>
			</InputContainer>
			{socialsErrors && <ErrorMessage>{get(socialsErrors, "twitter")?.message}</ErrorMessage>}
		</FlexColumn>
	);
};

export default ProfileFormSocialTwitter;
