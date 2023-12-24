import styled from "styled-components";

import { fileElementStyle } from "../style/Templates";

const ImageContent = styled.img`
	${fileElementStyle};
`;

const ImageElement = ({ fileUrl }: { fileUrl: string }) => {
	return (
		<ImageContent
			src={fileUrl}
			alt="Image content"
		/>
	);
};

export default ImageElement;
