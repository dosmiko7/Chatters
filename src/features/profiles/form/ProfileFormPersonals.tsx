import styled from "styled-components";
import { useFormContext, get } from "react-hook-form";

import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";
import ErrorMessage from "../../../ui/ErrorMessage";

const StyledPersonals = styled.div``;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0.6rem;
`;

const nameValidation = {
	pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
	minLength: { value: 1, message: "At least 1 character" },
	maxLength: { value: 20, message: "No more than 20 characters" },
};

// TODO: Make an error/warning element
const ProfileFormPersonals = () => {
	const { register, formState } = useFormContext();
	const personalErrors = formState.errors.personals;

	return (
		<StyledPersonals>
			<Heading as="h3">Personals</Heading>
			<div>
				<InputProfileForm
					type="text"
					placeholder="Nickname"
					{...register("nickname", {
						pattern: { value: /^[a-zA-Z0-9 ]+$/, message: "Special characters are not allowed" },
						minLength: { value: 5, message: "At least 5 characters" },
						maxLength: { value: 20, message: "No more than 20 characters" },
					})}
				/>
				{formState.errors["nickname"] && <ErrorMessage>{get(formState.errors, "nickname").message}</ErrorMessage>}
			</div>
			<Grid>
				<div>
					<InputProfileForm
						type="text"
						placeholder="Name"
						{...register("personals.name", nameValidation)}
					/>
					{personalErrors && <ErrorMessage>{get(personalErrors, "name")?.message}</ErrorMessage>}
				</div>
				<div>
					<InputProfileForm
						type="text"
						placeholder="Surname"
						{...register("personals.surname", nameValidation)}
					/>
					{personalErrors && <ErrorMessage>{get(personalErrors, "surname")?.message}</ErrorMessage>}
				</div>
				<div>
					<InputProfileForm
						type="text"
						placeholder="Birthday"
						onFocus={(e) => (e.target.type = "date")}
						{...register("personals.birthday")}
					/>
					{personalErrors && <ErrorMessage>{get(personalErrors, "birthday")?.message}</ErrorMessage>}
				</div>
				<div>
					<InputProfileForm
						type="text"
						placeholder="City"
						{...register("personals.city", {
							pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
							minLength: { value: 1, message: "At least 1 character" },
							maxLength: { value: 100, message: "No more than 100 characters" },
						})}
					/>
					{personalErrors && <ErrorMessage>{get(personalErrors, "city")?.message}</ErrorMessage>}
				</div>
			</Grid>
		</StyledPersonals>
	);
};

export default ProfileFormPersonals;
