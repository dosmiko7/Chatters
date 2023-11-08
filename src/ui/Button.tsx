import styled, { css } from "styled-components";
import { flexCentered } from "../style/Templates";

export interface ButtonProps {
	variant?: string;
	size?: string;
}

export const Button = styled.button<ButtonProps>`
	padding: var(--padding-sm);
	border-radius: var(--border-radius-md);
	color: var(--color-primary-0);
	background-color: var(--color-secondary-400);
	font-weight: var(--font-weight-medium);

	${(props) =>
		props.variant === "menu" &&
		css`
			${flexCentered};
			background-color: transparent;
		`}

	${(props) =>
		props.size === "large" &&
		css`
			font-size: 2.2rem;
		`}	

	${(props) =>
		props.size === "medium" &&
		css`
			font-size: 1.8rem;
		`}	

	${(props) =>
		props.size === "small" &&
		css`
			padding: var(--padding-xsm);
			font-size: 1.6rem;
		`}
		
	transition: var(--transition-all-3);

	&:hover {
		background-color: var(--color-secondary-100);
	}
`;
