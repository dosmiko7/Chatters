import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";
import ErrorMessage from "../../../ui/ErrorMessage";

const InputDescription = styled(InputProfileForm).attrs({
	as: "textarea",
})``;

const descrValidation = {
	maxLength: { value: 700, message: "No more than 700 characters" },
};

const ProfileFormDescription = () => {
	const { register, formState } = useFormContext();

	return (
		<>
			<Heading as="h3">Description</Heading>
			<InputDescription
				type="text"
				placeholder="Description"
				{...register("description", descrValidation)}
			/>
			{formState.errors["description"] && <ErrorMessage>{get(formState.errors, "description").message}</ErrorMessage>}
		</>
	);
};

export default ProfileFormDescription;
