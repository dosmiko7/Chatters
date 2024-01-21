import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { dateValidation } from "../../../utils/validationTemplates";
import ErrorMessage from "../../../ui/ErrorMessage";
import InputProfileForm from "../../../ui/InputProfileForm";
import Wrapper from "../../../ui/Wrapper";

const BirthdayInputSection = styled(Wrapper)``;

const ProfileFormPersonalBirthday = () => {
	const { register, formState } = useFormContext();
	const personalErrors = formState.errors.personals;

	return (
		<BirthdayInputSection aria-label="Birthday input section">
			<InputProfileForm
				type="text"
				placeholder="Birthday"
				onFocus={(e) => (e.target.type = "date")}
				{...register("personals.birthday", dateValidation)}
			/>
			{get(personalErrors, "birthday") ? <ErrorMessage>{get(personalErrors, "birthday")?.message}</ErrorMessage> : null}
		</BirthdayInputSection>
	);
};

export default ProfileFormPersonalBirthday;
