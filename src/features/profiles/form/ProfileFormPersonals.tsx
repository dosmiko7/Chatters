import styled from "styled-components";
import { FieldValues, Path } from "react-hook-form";

import Heading from "../../../ui/Heading";
import { Input } from "../../../ui/Input";
import { IProfileFormFieldProps } from "./ProfileForm";
import { Wrapper } from "../../../ui/Wrapper";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
`;

const ProfileFormPersonals = <T extends FieldValues>(props: IProfileFormFieldProps<T>) => {
	const { register, errors } = props;

	return (
		<div>
			<Heading as="h3">Personals</Heading>
			<Grid>
				<Wrapper>
					<Input
						type="text"
						{...register("name" as Path<T>, {
							pattern: { value: /^[\p{L}]{1,20}$/, message: "Only letters. Maximum 20 characters." },
						})}
					/>
				</Wrapper>
				<Wrapper>
					<Input
						type="text"
						{...register("surname" as Path<T>, {
							pattern: {
								value: /^[\p{L}]{1,20}$/,
								message: "Only letters. Maximum 20 characters.",
							},
						})}
					/>
				</Wrapper>
				<Wrapper>
					<Input
						type="text"
						{...register("city" as Path<T>, {
							pattern: {
								value: /^[\p{L}\s]{1,100}$/,
								message: "Only letters. Maximum 100 characters.",
							},
						})}
					/>
				</Wrapper>
				<Wrapper>
					<Input
						type="data"
						{...register("birthday" as Path<T>)}
					/>
				</Wrapper>
			</Grid>
		</div>
	);
};

export default ProfileFormPersonals;
