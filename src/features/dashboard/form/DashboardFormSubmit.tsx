import styled from "styled-components";
import { Button } from "../../../ui/Button";

const StyledButton = styled(Button)`
	margin-left: auto;
`;

const DashboardFormSubmit = () => {
	return <StyledButton type="submit">Add post</StyledButton>;
};

export default DashboardFormSubmit;