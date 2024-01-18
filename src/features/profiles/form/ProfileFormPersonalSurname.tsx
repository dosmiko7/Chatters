import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { nameValidation } from "../../../utils/validationTemplates";
import ErrorMessage from "../../../ui/ErrorMessage";
import InputProfileForm from "../../../ui/InputProfileForm";
import Wrapper from "../../../ui/Wrapper";

const SurnameInputSection = styled(Wrapper)``;

const ProfileFormPersonalSurname = () => {
	const { register, formState } = useFormContext();
	const personalErrors = formState.errors.personals;

	return (
		<SurnameInputSection aria-label="Surname input section">
			<InputProfileForm
				type="text"
				placeholder="Surname"
				{...register("personals.surname", nameValidation)}
			/>
			{personalErrors && <ErrorMessage>{get(personalErrors, "surname")?.message}</ErrorMessage>}
		</SurnameInputSection>
	);
};

export default ProfileFormPersonalSurname;
