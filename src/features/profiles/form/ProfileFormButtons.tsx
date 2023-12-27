import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import Button from "../../../ui/Button";

const StyledButtons = styled.div`
	${flexRow};
	justify-content: space-between;
	margin-top: 0.6rem;

	& > * {
		width: 40%;
	}
`;

const ProfileFormButtons = () => {
	const { reset } = useFormContext();

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
