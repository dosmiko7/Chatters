import { css } from "styled-components";

export const centeredAbsolute = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const flexCentered = css`
	display: flex;
	align-items: center;
	justify-content: center;
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

export const fileElementStyle = css`
	max-height: 28rem;
	width: auto;
	max-width: 100%;
`;

type PositionType = "left-top" | "top" | "right-top" | "right" | "right-bottom" | "bottom" | "left-bottom" | "left";

const getPositionStyle = (position: PositionType) => {
	let style = "";

	switch (position) {
		case "left-top":
			style += "top: 0; right: 110%;";
			style += "transform: translateY(-100%);";
			break;
		case "top":
			style += "top: -10%; left: 50%;";
			style += "transform: translate(-50%, -100%);";
			break;
		case "right-top":
			style += "top: 0; left: 110%;";
			style += "transform: translateY(-100%);";
			break;
		case "right":
			style += "top: 50%; left: 110%;";
			style += "transform: translateY(-50%);";
			break;
		case "right-bottom":
			style += "bottom: 0; left: 110%;";
			style += "transform: translateY(100%);";
			break;
		case "bottom":
			style += "bottom: -10%; left: 50%;";
			style += "transform: translate(-50%, 100%);";
			break;
		case "left-bottom":
			style += "bottom: 0; right: 110%;";
			style += "transform: translateY(100%);";
			break;
		case "left":
			style += "top: 50%; right: 110%;";
			style += "transform: translateY(-50%);";
			break;
		default:
			break;
	}

	return css`
		${style}
	`;
};

export const displayInfo = ({ message, position }: { message: string; position: PositionType }) => css`
	position: relative;

	&:hover::after {
		content: "${message}";
		z-index: 1000;
		position: absolute;
		${getPositionStyle(position)};
		width: max-content;
		background-color: var(--color-primary-500);
		border: var(--border-thin);
		padding: var(--padding-xsm);
		font-weight: var(--font-weight-medium);
	}
`;
