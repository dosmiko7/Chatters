import styled, { keyframes } from "styled-components";

import { flexCentered } from "../style/Templates";

const dot = keyframes`
    0% { background-color: transparent; transform: scale(1); }
    50% { background-color: #bada55; transform: scale(1.3); }
    100% { background-color: transparent; transform: scale(1); }
`;

const LoadingContainer = styled.div`
	${flexCentered}
	height: 100%;
	width: 100%;
`;

const LoadingDot = styled.span`
	animation: ${dot} ease-in-out 1s infinite;
	background-color: transparent;
	display: inline-block;
	height: 0.7rem;
	margin: 0.4rem;
	width: 0.7rem;

	&:nth-child(2) {
		animation-delay: 0.2s;
	}

	&:nth-child(3) {
		animation-delay: 0.4s;
	}
`;

const ThreeDots = () => {
	return (
		<LoadingContainer>
			<LoadingDot />
			<LoadingDot />
			<LoadingDot />
		</LoadingContainer>
	);
};

export default ThreeDots;
