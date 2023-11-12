import styled from "styled-components";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { FieldValues, Path } from "react-hook-form";

import Heading from "../../../ui/Heading";
import { IProfileFormFieldProps } from "./ProfileForm";
import { flexColumn } from "../../../style/Templates";
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

const ProfileFormSocials = <T extends FieldValues>(props: IProfileFormFieldProps<T>) => {
	const { register, errors } = props;

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
							{...register("linkedin" as Path<T>, linkValidation)}
						/>
					</InputContainer>
					{errors["linkedin"] && <p>{errors["linkedin"].message?.toString()}</p>}
				</FlexColumn>

				<FlexColumn>
					<InputContainer>
						<FaGithub style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Github"
							{...register("github" as Path<T>, linkValidation)}
						/>
					</InputContainer>
					{errors["github"] && <p>{errors["github"].message?.toString()}</p>}
				</FlexColumn>

				<FlexColumn>
					<InputContainer>
						<FaXTwitter style={iconStyle} />
						<StyledInput
							type="url"
							placeholder="Twitter"
							{...register("twitter" as Path<T>, linkValidation)}
						/>
					</InputContainer>
				</FlexColumn>
				{errors["twitter"] && <p>{errors["twitter"].message?.toString()}</p>}
			</FlexColumn>
		</StyledSocials>
	);
};

export default ProfileFormSocials;
