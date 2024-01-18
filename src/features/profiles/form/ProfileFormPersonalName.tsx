import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { nameValidation } from "../../../utils/validationTemplates";
import ErrorMessage from "../../../ui/ErrorMessage";
import InputProfileForm from "../../../ui/InputProfileForm";
import Wrapper from "../../../ui/Wrapper";

const NameInputSection = styled(Wrapper)``;

const ProfileFormPersonalName = () => {
	const { register, formState } = useFormContext();
	const personalErrors = formState.errors.personals;

	return (
		<NameInputSection aria-label="Name input section">
			<InputProfileForm
				type="text"
				placeholder="Name"
				{...register("personals.name", nameValidation)}
			/>
			{personalErrors && <ErrorMessage>{get(personalErrors, "name")?.message}</ErrorMessage>}
		</NameInputSection>
	);
};

export default ProfileFormPersonalName;
