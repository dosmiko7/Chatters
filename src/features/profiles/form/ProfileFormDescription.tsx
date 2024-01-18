import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { descriptionValidation } from "../../../utils/validationTemplates";
import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";
import ErrorMessage from "../../../ui/ErrorMessage";

const InputDescription = styled(InputProfileForm).attrs({
	as: "textarea",
})`
	height: 35%;
	width: 100%;
	resize: none;
`;

const ProfileFormDescription = () => {
	const { register, formState } = useFormContext();

	return (
		<>
			<Heading as="h3">Description</Heading>
			<InputDescription
				type="text"
				placeholder="Description"
				{...register("description", descriptionValidation)}
			/>
			{formState.errors["description"] && <ErrorMessage>{get(formState.errors, "description").message}</ErrorMessage>}
		</>
	);
};

export default ProfileFormDescription;
