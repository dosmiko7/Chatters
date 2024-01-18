import { get, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { cityValidation } from "../../../utils/validationTemplates";
import ErrorMessage from "../../../ui/ErrorMessage";
import InputProfileForm from "../../../ui/InputProfileForm";
import Wrapper from "../../../ui/Wrapper";

const CityInputSection = styled(Wrapper)``;

const ProfileFormPersonalCity = () => {
	const { register, formState } = useFormContext();
	const personalErrors = formState.errors.personals;

	return (
		<CityInputSection aria-label="City input section">
			<InputProfileForm
				type="text"
				placeholder="City"
				{...register("personals.city", cityValidation)}
			/>
			{personalErrors && <ErrorMessage>{get(personalErrors, "city")?.message}</ErrorMessage>}
		</CityInputSection>
	);
};

export default ProfileFormPersonalCity;
