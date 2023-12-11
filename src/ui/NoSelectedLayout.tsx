import styled from "styled-components";

import Heading from "./Heading";
import { centeredAbsolute, flexColumn } from "../style/Templates";

const StyledLayout = styled.div`
	${flexColumn};
	${centeredAbsolute};
	align-items: center;
`;

const IconContainer = styled.div`
	font-size: 12rem;
`;

const NoSelectedLayout = ({ message, icon }: { message: string; icon: JSX.Element }) => {
	return (
		<StyledLayout>
			<IconContainer>{icon}</IconContainer>
			<Heading as="h1">{message}</Heading>
		</StyledLayout>
	);
};

export default NoSelectedLayout;
