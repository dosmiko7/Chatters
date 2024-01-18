import styled from "styled-components";

const ErrorMessage = styled.p.attrs({
	"aria-label": "Error message",
})`
	color: var(--color-red-200);
`;

export default ErrorMessage;
