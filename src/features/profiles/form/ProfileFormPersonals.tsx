import styled from "styled-components";
import { FieldValues, Path } from "react-hook-form";

import Heading from "../../../ui/Heading";
import { Input } from "../../../ui/Input";
import { IProfileFormFieldProps } from "./ProfileFormWindow";
import { Wrapper } from "../../../ui/Wrapper";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0.6rem;
`;

const StyledInput = styled(Input)`
	border-radius: var(--border-radius-xsm);
	width: 100%;
	background-color: var(--color-primary-500);
	margin: var(--padding-xsm);

	&:hover {
		background-color: transparent;
	}
`;

// TODO: Make an error/warning element
const ProfileFormPersonals = <T extends FieldValues>(props: IProfileFormFieldProps<T>) => {
	const { register, errors } = props;

	const nameValidation = {
		pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
		minLength: { value: 1, message: "The name should consist of at least 1 character" },
		maxLength: { value: 20, message: "No more than 20 characters" },
	};

	return (
		<div>
			<Heading as="h3">Personals</Heading>
			<Grid>
				<Wrapper>
					<StyledInput
						placeholder="Name"
						type="text"
						{...register("name" as Path<T>, nameValidation)}
					/>
					{errors["name"] && <p>{errors["name"].message?.toString()}</p>}
				</Wrapper>
				<Wrapper>
					<StyledInput
						placeholder="Surname"
						type="text"
						{...register("surname" as Path<T>, nameValidation)}
					/>
					{errors["surname"] && <p>{errors["surname"].message?.toString()}</p>}
				</Wrapper>
				<Wrapper>
					<StyledInput
						placeholder="City"
						type="text"
						{...register("city" as Path<T>, {
							pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
							minLength: { value: 1, message: "The city should consist of at least 1 character" },
							maxLength: { value: 100, message: "No more than 100 characters" },
						})}
					/>
					{errors["city"] && <p>{errors["city"].message?.toString()}</p>}
				</Wrapper>
				<Wrapper>
					<StyledInput
						placeholder="Birthday"
						type="date"
						{...register("birthday" as Path<T>)}
					/>
					{errors["data"] && <p>{errors["data"].message?.toString()}</p>}
				</Wrapper>
			</Grid>
		</div>
	);
};

export default ProfileFormPersonals;
