import { ReactNode } from "react";
import styled from "styled-components";

import { flexCentered } from "../style/Templates";
import Container from "./Container";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

const StyledCard = styled(Container)`
	background-color: var(--color-primary-500);
	border: 1px solid transparent;
	border-radius: var(--border-radius-md);
	padding: var(--padding-md);
	display: grid;
	grid-template-rows: 1fr 1fr;
	transition: var(--transition-all-3);
	box-shadow: var(--shadow-md);

	&:hover {
		background-color: var(--color-primary-400);
		border: 1px solid var(--color-secondary-400);
		cursor: pointer;
	}
`;

const IconBox = styled.div`
	${flexCentered};
	font-size: 12rem;
`;

const InfoBox = styled.div``;

const Card = ({
	icon,
	heading,
	info,
	onClickHandler,
}: {
	icon: ReactNode;
	heading: string;
	info: string;
	onClickHandler: () => void;
}) => {
	return (
		<StyledCard onClick={onClickHandler}>
			<IconBox>{icon}</IconBox>
			<InfoBox>
				<Heading as="h2">{heading}</Heading>
				<Paragraph>{info}</Paragraph>
			</InfoBox>
		</StyledCard>
	);
};

export default Card;
