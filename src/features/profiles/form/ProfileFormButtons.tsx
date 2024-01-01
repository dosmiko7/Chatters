import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { flexRow } from "../../../style/Templates";
import Button from "../../../ui/Button";

const StyledButtons = styled.div`
	${flexRow};
	justify-content: space-between;
	margin-top: 10px;

	& > * {
		width: 40%;
	}
`;

const StyledButton = styled(Button)`
	justify-content: center;
`;

const ProfileFormButtons = () => {
	const { reset } = useFormContext();

	return (
		<StyledButtons>
			<StyledButton
				type="button"
				variant="danger"
				onClick={() => reset()}
			>
				Reset
			</StyledButton>
			<StyledButton type="submit">Submit</StyledButton>
		</StyledButtons>
	);
};

export default ProfileFormButtons;
