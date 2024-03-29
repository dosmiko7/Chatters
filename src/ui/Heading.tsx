import styled, { css } from "styled-components";

interface HeadingProps {
	as: string;
	center?: boolean;
}

const Heading = styled.h1<HeadingProps>`
	margin-bottom: 0.6rem;
	color: var(--font-color);

	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 3rem;
			font-weight: var(--font-weight-bold);
			margin-bottom: 2rem;
		`}

	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 2rem;
			font-weight: var(--font-weight-bold);
		`}

	${(props) =>
		props.as === "h3" &&
		css`
			font-size: 1.6rem;
			font-weight: var(--font-weight-medium);
		`}

	${(props) =>
		props.as === "h4" &&
		css`
			font-size: 1.4rem;
			font-weight: var(--font-weight-medium);
		`}

    ${(props) =>
		props.center &&
		css`
			text-align: center;
		`}

  line-height: 1.4;
`;

export default Heading;
