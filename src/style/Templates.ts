import { css } from "styled-components";

export const centeredAbsolute = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const flexCentered = css`
	display: flex;
	place-items: center;
`;

export const flexColumn = css`
	display: flex;
	flex-direction: column;
`;

export const flexRow = css`
	display: flex;
	flex-direction: row;
`;

export const ephasis = css`
	position: relative;
	color: var(--color-primary-50);
	text-decoration: none;
	cursor: pointer;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		height: 1px;
		width: 0;
		background-color: var(--color-primary-500);
		transition: width 0.3s ease-in;
	}

	&:hover {
		color: var(--color-primary-500);

		&::after {
			width: 100%;
		}
	}
`;
