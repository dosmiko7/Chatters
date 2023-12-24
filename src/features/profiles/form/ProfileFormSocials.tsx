import styled from "styled-components";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { get, useFormContext } from "react-hook-form";

import { flexColumn } from "../../../style/Templates";
import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";

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

const ProfileFormSocials = () => {
	const { register, formState } = useFormContext();
	const socialsErrors = formState.errors.socials;

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

	return (
		<StyledSocials>
			<Heading as="h3">Socials</Heading>
			<FlexColumn>
				<FlexColumn>
					<InputContainer>
						<FaLinkedin style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Linkedin"
							{...register("socials.linkedin", linkValidation)}
						/>
					</InputContainer>
					{socialsErrors && <p>{get(socialsErrors, "linkedin")?.message}</p>}
				</FlexColumn>

				<FlexColumn>
					<InputContainer>
						<FaGithub style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Github"
							{...register("socials.github", linkValidation)}
						/>
					</InputContainer>
					{socialsErrors && <p>{get(socialsErrors, "github")?.message}</p>}
				</FlexColumn>

				<FlexColumn>
					<InputContainer>
						<FaXTwitter style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Twitter"
							{...register("socials.twitter", linkValidation)}
						/>
					</InputContainer>
				</FlexColumn>
				{socialsErrors && <p>{get(socialsErrors, "twitter")?.message}</p>}
			</FlexColumn>
		</StyledSocials>
	);
};

export default ProfileFormSocials;
