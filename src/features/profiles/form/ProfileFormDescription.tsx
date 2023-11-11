import { FieldValues, Path } from "react-hook-form";

import { IProfileFormFieldProps } from "./ProfileFormWindow";
import styled from "styled-components";
import Heading from "../../../ui/Heading";
import InputProfileForm from "../../../ui/InputProfileForm";

const StyledDescription = styled.div``;

const InputDescription = styled(InputProfileForm).attrs({
	as: "textarea",
})``;

const ProfileFormDescription = <T extends FieldValues>(props: IProfileFormFieldProps<T>) => {
	const { register, errors } = props;

	return (
		<StyledDescription>
			<Heading as="h3">Description</Heading>
			<InputDescription
				type="text"
				placeholder="Description"
				{...register("description" as Path<T>)}
			/>
			{errors["description"] && <p>{errors["description"].message?.toString()}</p>}
		</StyledDescription>
	);
};

export default ProfileFormDescription;
