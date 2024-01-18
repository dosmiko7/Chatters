import styled from "styled-components";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { get, useFormContext } from "react-hook-form";

import { flexColumn } from "../../../style/Templates";
import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";
import ErrorMessage from "../../../ui/ErrorMessage";

const StyledSocials = styled.div``;

const FlexColumn = styled.div`
	${flexColumn};
`;

const InputContainer = styled.div`
	position: relative;
`;

const StyledInput = styled(InputProfileForm)`
	padding-left: 4rem;
`;

const iconStyle = {
	position: "absolute",
	top: "50%",
	left: "0",
	transform: "translate(50%, -50%)",
	fontSize: "2rem",
};

const linkValidation = {
	pattern: {
		value: /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i,
		message: "Invalid URL format",
	},
};

const ProfileFormSocials = () => {
	const { register, formState } = useFormContext();
	const socialsErrors = formState.errors.socials;

	return (
		<StyledSocials>
			<Heading as="h3">Socials</Heading>
			<FlexColumn>
				<FlexColumn aria-label="Linkedin input section">
					<InputContainer>
						<FaLinkedin style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Linkedin"
							{...register("socials.linkedin", linkValidation)}
						/>
					</InputContainer>
					{socialsErrors && <ErrorMessage>{get(socialsErrors, "linkedin")?.message}</ErrorMessage>}
				</FlexColumn>

				<FlexColumn aria-label="GitHub input section">
					<InputContainer>
						<FaGithub style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Github"
							{...register("socials.github", linkValidation)}
						/>
					</InputContainer>
					{socialsErrors && <ErrorMessage>{get(socialsErrors, "github")?.message}</ErrorMessage>}
				</FlexColumn>

				<FlexColumn aria-label="Twitter input section">
					<InputContainer>
						<FaXTwitter style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Twitter"
							{...register("socials.twitter", linkValidation)}
						/>
					</InputContainer>
				</FlexColumn>
				{socialsErrors && <ErrorMessage>{get(socialsErrors, "twitter")?.message}</ErrorMessage>}
			</FlexColumn>
		</StyledSocials>
	);
};

export default ProfileFormSocials;
