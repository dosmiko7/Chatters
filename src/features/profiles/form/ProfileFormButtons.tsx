import { FieldValues, UseFormReset } from "react-hook-form";
import styled from "styled-components";

import { Button } from "../../../ui/Button";
import { flexRow } from "../../../style/Templates";

const StyledButtons = styled.div`
	${flexRow};
	justify-content: space-between;
	margin-top: 0.6rem;

	& > * {
		width: 40%;
	}
`;

interface IProfileFormButtonProps<T extends FieldValues> {
	reset: UseFormReset<T>;
}

const ProfileFormButtons = <T extends FieldValues>(props: IProfileFormButtonProps<T>) => {
	const { reset } = props;

	return (
		<StyledButtons>
			<Button
				type="button"
				variant="danger"
				onClick={() => reset()}
			>
				Reset
			</Button>
			<Button type="submit">Submit</Button>
		</StyledButtons>
	);
};

export default ProfileFormButtons;
