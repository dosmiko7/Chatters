import styled from "styled-components";

import Heading from "../ui/Heading";
import { Button } from "../ui/Button";
import { flexCentered, flexColumn } from "../style/Templates";

const StyledPageNotFound = styled.div`
	${flexColumn};
	${flexCentered};
	background-color: var(--color-primary-400);
	height: 100vh;
`;

const PageNotFound = () => {
	return (
		<StyledPageNotFound>
			<Heading as="h1">The page you are looking for could not be found</Heading>
			<Button>&larr; Go back</Button>
		</StyledPageNotFound>
	);
};

export default PageNotFound;
