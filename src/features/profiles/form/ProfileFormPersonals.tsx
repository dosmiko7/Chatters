import styled from "styled-components";
import { useFormContext, get } from "react-hook-form";

import Heading from "../../../ui/Heading";
import { Wrapper } from "../../../ui/Wrapper";
import InputProfileForm from "../../../ui/InputProfileForm";

const StyledPersonals = styled.div``;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0.6rem;
`;

// TODO: Make an error/warning element
const ProfileFormPersonals = () => {
	const { register, formState } = useFormContext();
	const personalErrors = formState.errors.personals;

	const nameValidation = {
		pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
		minLength: { value: 1, message: "At least 1 character" },
		maxLength: { value: 20, message: "No more than 20 characters" },
	};

	return (
		<StyledPersonals>
			<Heading as="h3">Personals</Heading>
			<Wrapper>
				<InputProfileForm
					type="text"
					placeholder="Nickname"
					{...register("nickname", {
						pattern: { value: /^[a-zA-Z0-9 ]+$/, message: "Special characters are not allowed" },
						minLength: { value: 5, message: "At least 5 characters" },
						maxLength: { value: 20, message: "No more than 20 characters" },
					})}
				/>
				{formState.errors["nickname"] && <p>{get(formState.errors, "nickname").message}</p>}
			</Wrapper>
			<Grid>
				<Wrapper>
					<InputProfileForm
						type="text"
						placeholder="Name"
						{...register("personals.name", nameValidation)}
					/>
					{personalErrors && <p>{get(personalErrors, "name")?.message}</p>}
				</Wrapper>
				<Wrapper>
					<InputProfileForm
						type="text"
						placeholder="Surname"
						{...register("personals.surname", nameValidation)}
					/>
					{personalErrors && <p>{get(personalErrors, "surname")?.message}</p>}
				</Wrapper>
				<Wrapper>
					<InputProfileForm
						type="text"
						placeholder="Birthday"
						onFocus={(e) => (e.target.type = "date")}
						{...register("personals.birthday")}
					/>
					{personalErrors && <p>{get(personalErrors, "birthday")?.message}</p>}
				</Wrapper>
				<Wrapper>
					<InputProfileForm
						type="text"
						placeholder="City"
						{...register("personals.city", {
							pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
							minLength: { value: 1, message: "At least 1 character" },
							maxLength: { value: 100, message: "No more than 100 characters" },
						})}
					/>
					{personalErrors && <p>{get(personalErrors, "city")?.message}</p>}
				</Wrapper>
			</Grid>
		</StyledPersonals>
	);
};

export default ProfileFormPersonals;
