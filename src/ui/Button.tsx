import styled, { css } from "styled-components";

import { flexCentered, flexRow } from "../style/Templates";

export interface ButtonProps {
	variant?: "menu" | "danger" | "safe" | "profile";
	size?: "large" | "medium" | "small";
}

const Button = styled.button<ButtonProps>`
	${flexRow};
	align-items: center;
	gap: 0.6rem;
	padding: var(--padding-sm);
	color: #fff;
	border-radius: var(--border-radius-md);
	background-color: var(--color-secondary-400);
	font-weight: var(--font-weight-medium);

	&:hover {
		background-color: var(--color-secondary-300);
	}

	${(props) =>
		props.variant === "menu" &&
		css`
			${flexCentered};
			background-color: var(--color-primary-200);
			color: var(--font-color);
		`}

	${(props) =>
		props.variant === "danger" &&
		css`
			background-color: var(--color-red-100);
			color: #fff;

			&:hover {
				background-color: var(--color-red-200);
			}
		`}

	${(props) =>
		props.variant === "safe" &&
		css`
			background-color: var(--color-green-100);

			&:hover {
				background-color: var(--color-green-200);
			}
		`}

	${(props) =>
		props.variant === "profile" &&
		css`
			${flexRow};
			align-items: center;
			gap: 0.6rem;
			border-radius: var(--border-radius-xsm);
		`}

	${(props) =>
		props.size === "large" &&
		css`
			font-size: 3rem;
		`}	

	${(props) =>
		props.size === "medium" &&
		css`
			font-size: 2.2rem;
		`}	

	${(props) =>
		props.size === "small" &&
		css`
			padding: var(--padding-xsm);
			font-size: 1.6rem;
		`}
		
	transition: var(--transition-all-3);
`;

export default Button;
