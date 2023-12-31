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

const PlaceholderContainer = styled.div`
	height: 30rem;
	width: 28rem;
`;

const FullImage = styled.img`
	width: 100%;
	height: auto;
`;

const ImageElement = ({ fileUrl }: { fileUrl: string }) => {
	const id = useId();

	return (
		<Modal>
			<Modal.Open opens={id}>
				<ImageContent
					src={fileUrl}
					placeholder={
						<PlaceholderContainer>
							<ThreeDots />
						</PlaceholderContainer>
					}
					effect="blur"
					alt="Image content"
				/>
			</Modal.Open>

			<Modal.Window
				name={id}
				width="max-content"
				height="max-content"
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
