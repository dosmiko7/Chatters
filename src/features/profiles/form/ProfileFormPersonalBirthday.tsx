import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

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
				{...register("personals.birthday")}
			/>
			{personalErrors && <ErrorMessage>{get(personalErrors, "birthday")?.message}</ErrorMessage>}
		</BirthdayInputSection>
	);
};

export default ProfileFormPersonalBirthday;
