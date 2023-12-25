import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { fileElementStyle } from "../style/Templates";
import ThreeDots from "./ThreeDots";

const ImageContent = styled(LazyLoadImage)`
	${fileElementStyle};
`;

const ImageElement = ({ fileUrl }: { fileUrl: string }) => {
	return (
		<ImageContent
			src={fileUrl}
			effect="blur"
			alt="Image content"
			placeholder={<ThreeDots />}
		/>
	);
};

export default ImageElement;
