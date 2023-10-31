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
