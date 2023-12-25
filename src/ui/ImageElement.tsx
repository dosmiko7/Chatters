import { useId } from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { fileElementStyle } from "../style/Templates";
import ThreeDots from "./ThreeDots";
import Modal from "./Modal";

const ImageContent = styled(LazyLoadImage)`
	${fileElementStyle};

	&:hover {
		cursor: pointer;
	}
`;

const FullImage = styled.img`
	max-width: 70dvh;
	max-height: 70dvh;
`;

const ImageElement = ({ fileUrl }: { fileUrl: string }) => {
	const id = useId();

	return (
		<Modal>
			<Modal.Open opens={id}>
				<ImageContent
					src={fileUrl}
					effect="blur"
					alt="Image content"
					placeholder={<ThreeDots />}
				/>
			</Modal.Open>

			<Modal.Window
				name={id}
				width="fit-content"
				height="fit-content"
			>
				<FullImage
					src={fileUrl}
					alt="Full size image"
				/>
			</Modal.Window>
		</Modal>
	);
};

export default ImageElement;
