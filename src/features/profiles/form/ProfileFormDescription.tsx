import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";

const InputDescription = styled(InputProfileForm).attrs({
	as: "textarea",
})``;

const ProfileFormDescription = () => {
	const { register, formState } = useFormContext();

	const descrValidation = {
		maxLength: { value: 700, message: "No more than 700 characters" },
	};

	return (
		<div>
			<Heading as="h3">Description</Heading>
			<InputDescription
				type="text"
				placeholder="Description"
				{...register("description", descrValidation)}
			/>
			{formState.errors["description"] && <p>{get(formState.errors, "description").message}</p>}
		</div>
	);
};

export default ProfileFormDescription;
