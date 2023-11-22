import styled from "styled-components";
import { flexRow } from "../style/Templates";

interface IListElementProps {
	nonBorder?: boolean;
}

export const ListElement = styled.li<IListElementProps>`
	${flexRow};
	align-items: center;
	padding: var(--padding-sm);
	border-bottom: ${(props) => (props.nonBorder ? "none" : "var(--border-thin)")};
`;
