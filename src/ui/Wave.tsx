import styled, { keyframes } from "styled-components";

const ripple = keyframes`
  to {
    transform: scale(5);
    opacity: 0;
  }
`;

const Wave = styled.div`
	position: absolute;
	width: 20px;
	height: 20px;
	background: radial-gradient(circle, transparent 20%, var(--color-secondary-100) 70%);
	border-radius: 50%;
	transform: scale(0) translate(-50%, -50%);
	animation: ${ripple} 2s ease-out;
`;

export default Wave;
