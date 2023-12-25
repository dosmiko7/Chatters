import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import AudioElement from "../../ui/AudioElement";
import DownloadElement from "../../ui/DownloadElement";
import VideoElement from "../../ui/VideoElement";
import { flexCentered } from "../../style/Templates";
import ThreeDots from "../../ui/ThreeDots";

const StyledAttachment = styled.div`
	${flexCentered};
	margin-top: 1rem;
`;

const DashboardListAttachment = ({ type, file }: { type: string; file: string }) => {
	let renderElement;
	switch (true) {
		case type.includes("audio"):
			renderElement = (
				<AudioElement
					fileSrc={file}
					type={type}
				/>
			);
			break;
		case type.includes("video"):
			renderElement = (
				<VideoElement
					fileSrc={file}
					type={type}
				/>
			);
			break;
		case type.includes("image"):
			renderElement = (
				<LazyLoadImage
					src={file}
					effect="blur"
					placeholder={<ThreeDots />}
				/>
			);
			break;
		default:
			<DownloadElement
				fileUrl={file}
				filename="file"
			/>;
			break;
	}

	return <StyledAttachment>{renderElement}</StyledAttachment>;
};

export default DashboardListAttachment;
