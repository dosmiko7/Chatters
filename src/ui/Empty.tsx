import styled from "styled-components";

import { centeredAbsolute, flexColumn } from "../style/Templates";
import Heading from "./Heading";
import Wrapper from "./Wrapper";

const StyledLayout = styled(Wrapper)`
	${flexColumn};
	${centeredAbsolute};
	align-items: center;
`;

const IconContainer = styled.div`
	font-size: 12rem;
`;

const Empty = ({ message, icon }: { message: string; icon: JSX.Element }) => {
	return (
		<StyledLayout>
			<IconContainer aria-label="icon container">{icon}</IconContainer>
			<Heading as="h1">{message}</Heading>
		</StyledLayout>
	);
};

export default Empty;
