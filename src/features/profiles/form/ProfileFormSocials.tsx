import styled from "styled-components";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

import { FieldValues } from "react-hook-form";
import Heading from "../../../ui/Heading";
import { IProfileFormFieldProps } from "./ProfileFormWindow";
import { flexColumn } from "../../../style/Templates";
import InputProfileForm from "../../../ui/InputProfileForm";

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

	return (
		<div>
			<Heading as="h3">Socials</Heading>
			<FlexColumn>
				<FlexColumn>
					<InputContainer>
						<FaLinkedin style={iconStyle} />
						<StyledInput />
					</InputContainer>
				</FlexColumn>

				<FlexColumn>
					<InputContainer>
						<FaGithub style={iconStyle} />
						<StyledInput />
					</InputContainer>
				</FlexColumn>

				<FlexColumn>
					<InputContainer>
						<FaXTwitter style={iconStyle} />
						<StyledInput />
					</InputContainer>
				</FlexColumn>
			</FlexColumn>
		</div>
	);
};

export default ProfileFormSocials;
