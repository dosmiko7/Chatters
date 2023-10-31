import styled, { css } from "styled-components";
import { flexCentered } from "../style/Templates";

interface ButtonProps {
	variant?: string;
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
			font-size: 1.8rem;
			background-color: transparent;
		`}

	transition: all 0.3s;

	&:hover {
		background-color: var(--color-secondary-100);
	}
`;
