import styled from "styled-components";

const Container = styled.div.attrs({
	role: "container",
})`
	background-color: var(--color-primary-400);
	padding: var(--padding-sm);
	border-right: 1px solid var(--color-primary-200);
`;

export default Container;
