import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { descriptionValidation } from "../../../utils/validationTemplates";
import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";
import ErrorMessage from "../../../ui/ErrorMessage";
import Wrapper from "../../../ui/Wrapper";

const InputDescription = styled(InputProfileForm).attrs({
	as: "textarea",
})`
	height: 70%;
	width: 100%;
	resize: none;
`;

const DescriptionSection = styled(Wrapper)`
	flex: 1;
	width: 100%;
`;

const ProfileFormDescription = () => {
	const { register, formState } = useFormContext();

	return (
		<DescriptionSection>
			<Heading as="h3">Description</Heading>
			<InputDescription
				type="text"
				placeholder="Description"
				{...register("description", descriptionValidation)}
			/>
			{formState.errors["description"] && <ErrorMessage>{get(formState.errors, "description").message}</ErrorMessage>}
		</DescriptionSection>
	);
};

export default ProfileFormDescription;
