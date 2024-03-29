import styled from "styled-components";

const Overlay = styled.div.attrs({
	role: "overlay",
})`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: var(--transition-all-5);
`;

export default Overlay;
