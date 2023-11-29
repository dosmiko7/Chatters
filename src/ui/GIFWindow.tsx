import styled from "styled-components";

import { flexColumn } from "../style/Templates";
import { Container } from "./Container";

const GIFWindow = styled(Container)`
	${flexColumn};
	position: absolute;
	top: -40rem;
	height: 40rem;
	width: 30rem;
	align-items: center;
	background-color: var(--color-primary-300);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-sm);
	border-right: none;
`;

export const GIFKeyInput = styled.input`
	position: sticky;
	font-size: 1.6rem;
	width: 100%;
	border-radius: var(--border-radius-sm);
	padding: var(--padding-xsm);
	background-color: var(--color-primary-400);
`;

export default GIFWindow;
